<?php
// Contact form endpoint on the webspace at all-inkl: emails the message from
// the website's contact form to the church mailbox. The recipient is fixed,
// so the script cannot be used to send mail anywhere else.

const RECIPIENT = 'info@lebensfundament.org';
const SENDER = 'info@lebensfundament.org';
const MAX_FIELD = 200;
const MAX_MESSAGE = 5000;

// Abuse protection: messages per visitor in 10 minutes, and per day in total
const LIMIT_PER_VISITOR = 5;
const LIMIT_PER_DAY = 50;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function reply(int $status, string $error = ''): void
{
    http_response_code($status);
    echo json_encode($error === '' ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    exit;
}

// One line, no control characters (keeps headers and subject safe)
function single_line($value, int $max): string
{
    $text = trim(preg_replace('/[\x00-\x1F\x7F]+/u', ' ', (string) $value));
    return mb_substr($text, 0, $max);
}

// Rate limit with a small file outside the web folder. Only a keyed hash
// of the IP address is stored, and entries are dropped after a day. If no
// folder is writable, messages are let through rather than lost.
function rate_limited(): bool
{
    $dir = dirname(__DIR__) . '/.contact-limits';
    if (!is_dir($dir) && !@mkdir($dir, 0700)) {
        $dir = sys_get_temp_dir() . '/lebensfundament-contact';
        if (!is_dir($dir) && !@mkdir($dir, 0700)) {
            return false;
        }
    }

    $keyFile = $dir . '/key';
    $key = @file_get_contents($keyFile);
    if ($key === false || strlen($key) < 32) {
        $key = bin2hex(random_bytes(32));
        @file_put_contents($keyFile, $key, LOCK_EX);
    }
    $visitor = hash_hmac('sha256', $_SERVER['REMOTE_ADDR'] ?? '', $key);

    $handle = @fopen($dir . '/log.json', 'c+');
    if ($handle === false) {
        return false;
    }
    flock($handle, LOCK_EX);
    $log = json_decode((string) stream_get_contents($handle), true);
    $now = time();
    $log = array_values(array_filter(is_array($log) ? $log : [], function ($entry) use ($now) {
        return is_array($entry) && isset($entry[0], $entry[1]) && $entry[0] > $now - 86400;
    }));

    $recent = count(array_filter($log, function ($entry) use ($now, $visitor) {
        return $entry[1] === $visitor && $entry[0] > $now - 600;
    }));
    $limited = $recent >= LIMIT_PER_VISITOR || count($log) >= LIMIT_PER_DAY;
    if (!$limited) {
        $log[] = [$now, $visitor];
    }

    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($log));
    flock($handle, LOCK_UN);
    fclose($handle);
    return $limited;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    reply(405, 'method');
}

// Only JSON: plain HTML forms on other sites cannot send it
if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) {
    reply(415, 'type');
}

// Browsers send Origin (or at least Referer); only accept posts from this website
$source = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
$host = preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? '');
if ($source === '' || parse_url($source, PHP_URL_HOST) !== $host) {
    reply(403, 'origin');
}

$data = json_decode((string) file_get_contents('php://input', false, null, 0, 20000), true);
if (!is_array($data)) {
    reply(400, 'invalid');
}

// Hidden from people; bots that fill it get a success reply and no mail
if (single_line($data['website'] ?? '', MAX_FIELD) !== '') {
    reply(200);
}

$name = single_line($data['name'] ?? '', MAX_FIELD);
$email = single_line($data['email'] ?? '', MAX_FIELD);
$subject = single_line($data['subject'] ?? '', MAX_FIELD);
$message = trim(str_replace(["\r\n", "\r"], "\n", (string) ($data['message'] ?? '')));
$message = mb_substr(preg_replace('/[\x00-\x08\x0B-\x1F\x7F]/u', '', $message), 0, MAX_MESSAGE);

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    reply(422, 'fields');
}

if (rate_limited()) {
    reply(429, 'rate');
}

$body = "Neue Nachricht über das Kontaktformular der Website\n\n"
    . "Name: {$name}\n"
    . "E-Mail: {$email}\n"
    . "Betreff: {$subject}\n\n"
    . $message . "\n";

$headers = [
    'From' => 'Website Lebensfundament <' . SENDER . '>',
    'Reply-To' => $email,
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => '8bit',
];

$mailSubject = mb_encode_mimeheader("Website-Kontakt: {$subject} (von {$name})", 'UTF-8', 'Q');

if (!mail(RECIPIENT, $mailSubject, $body, $headers, '-f' . SENDER)) {
    reply(500, 'mail');
}

reply(200);
