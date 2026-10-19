// The contact form posts to contact.php on the webspace at all-inkl, which
// emails the message to the church mailbox (public/contact.php). PHP only
// runs on the live site, not in local development.
export async function sendMessage(fields) {
  const response = await fetch('/contact.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields)
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok || !result.ok) {
    throw new Error(result.error || `HTTP ${response.status}`);
  }
}
