// Form submissions go to Netlify Forms. Netlify detects the forms through
// the static copies in public/__forms.html (same form and field names), and
// submissions are posted to that file. Who gets an email is set in Netlify
// (Notifications → Form submission notifications), not in the code.
export async function sendForm(formName, fields) {
  const response = await fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ 'form-name': formName, ...fields }).toString()
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
}
