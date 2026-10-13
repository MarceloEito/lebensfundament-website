// Form submissions go to Netlify Forms. Netlify detects the forms through
// the hidden copies in index.html (same form and field names). Who gets an
// email is set in Netlify (Forms → Form notifications), not in the code.
export async function sendForm(formName, fields) {
  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ 'form-name': formName, ...fields }).toString()
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
}
