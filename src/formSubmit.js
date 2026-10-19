// FormSubmit forwards submissions to this address. After the first
// submission FormSubmit sends an activation email; once confirmed it also
// offers a random alias that can replace the address here to hide it.
export const FORM_ENDPOINT = 'https://formsubmit.co/ajax/info@lebensfundament.org';

// Sends one submission. Throws on failure; `error.needsActivation` is set
// while FormSubmit still waits for the one-time activation of the address.
export async function sendForm(fields) {
  const response = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(fields)
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok || String(result.success) !== 'true') {
    const error = new Error(result.message || `HTTP ${response.status}`);
    error.needsActivation = /activat/i.test(result.message || '');
    throw error;
  }
}
