import React, { useState } from 'react';
import './ContactForm.css';

// FormSubmit forwards submissions to this address. After the first
// submission FormSubmit sends an activation email; once confirmed it also
// offers a random alias that can replace the address here to hide it.
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/peney49946@leafflip.com';

const SUBJECT_LABELS = {
  visit: 'Besuch planen',
  prayer: 'Gebetsanliegen',
  youth: 'Jugend',
  general: 'Allgemeine Frage',
  other: 'Sonstiges'
};

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

function ContactForm() {
  const [formData, setFormData] = useState(EMPTY_FORM);

  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    const subjectLabel = SUBJECT_LABELS[formData.subject] || formData.subject;

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          Name: formData.name,
          email: formData.email,
          Telefon: formData.phone || '-',
          Betreff: subjectLabel,
          Nachricht: formData.message,
          _subject: `Website-Kontakt: ${subjectLabel} (von ${formData.name})`,
          _template: 'table',
          _honey: honeypot
        })
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || String(result.success) !== 'true') {
        throw new Error(result.message || `HTTP ${response.status}`);
      }

      setStatus('sent');
      setFormData(EMPTY_FORM);
    } catch (error) {
      console.error('Contact form failed:', error);
      setStatus('error');
    }
  };

  return (
    <section className="contact-modern" id="contact">
      <div className="container-modern">
        <div className="contact-header" data-aos="fade-up">
          <h2>Kontaktiere uns</h2>
          <p>Hast du Fragen oder möchtest mehr erfahren? Wir sind für dich da!</p>
        </div>

        <div className="contact-wrapper" data-aos="fade-up">
          {status === 'sent' ? (
            <div className="success-modern">
              <div className="success-icon">✓</div>
              <h3>Vielen Dank!</h3>
              <p>Deine Nachricht wurde erfolgreich gesendet. Wir melden uns bald bei dir.</p>
              <button type="button" className="btn btn-outline" onClick={() => setStatus('idle')}>
                Weitere Nachricht schreiben
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form-modern">
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    maxLength={100}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Dein vollständiger Name"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">E-Mail *</label>
                  <input
                    type="email"
                    id="email"
                    maxLength={254}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="deine@email.de"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="phone">Telefon</label>
                  <input
                    type="tel"
                    id="phone"
                    maxLength={30}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+49 123 456789"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="subject">Betreff *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Bitte wählen</option>
                    <option value="visit">Besuch planen</option>
                    <option value="prayer">Gebetsanliegen</option>
                    <option value="youth">Jugend</option>
                    <option value="general">Allgemeine Frage</option>
                    <option value="other">Sonstiges</option>
                  </select>
                </div>
              </div>

              <div className="form-field full-width">
                <label htmlFor="message">Nachricht *</label>
                <textarea
                  id="message"
                  maxLength={5000}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Wie können wir dir helfen?"
                ></textarea>
              </div>

              {/* Hidden from people; bots that fill it are rejected by FormSubmit */}
              <input
                type="text"
                name="_honey"
                className="form-honeypot"
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />

              {status === 'error' && (
                <p className="form-error" role="alert">
                  Deine Nachricht konnte leider nicht gesendet werden. Bitte versuche
                  es später noch einmal.
                </p>
              )}

              <div className="form-submit-wrap">
                <button
                  type="submit"
                  className="btn btn-fill btn-lg"
                  style={{ width: '100%' }}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Wird gesendet …' : 'Nachricht senden'}
                </button>
              </div>

              <p className="form-privacy">
                Mit dem Absenden willigst du ein, dass wir deine Angaben zur
                Bearbeitung deiner Anfrage verwenden. Mehr dazu in unserer{' '}
                <a href="/datenschutz/">Datenschutzerklärung</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
