<?php
// Contact form endpoint on the webspace at all-inkl: emails the message from
// the website's contact form to the church mailbox. The recipient is fixed,
// so the script cannot be used to send mail anywhere else.

const RECIPIENT = 'info@lebensfundament.org';
const SENDER = 'info@lebensfundament.org';
const MAX_FIELD = 200;
const MAX_MESSAGE = 5000;

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

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    reply(405, 'method');
}

// Browsers send an Origin header; only accept posts from this website
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? '');
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== $host) {
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
