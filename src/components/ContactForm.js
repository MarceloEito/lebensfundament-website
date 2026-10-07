import React, { useRef, useState } from 'react';
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
  subject: '',
  message: ''
};

const FIELD_ORDER = ['name', 'email', 'subject', 'message'];

// Requires a dot in the domain and a TLD of at least two letters, so
// entries like "max@web" or "max@web.d" are rejected.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[a-zA-Z]{2,}$/;

function validateField(name, value) {
  const trimmed = value.trim();

  switch (name) {
    case 'name':
      if (!trimmed) return 'Bitte gib deinen Namen ein.';
      if (trimmed.length < 2) return 'Der Name muss mindestens 2 Zeichen lang sein.';
      return '';
    case 'email':
      if (!trimmed) return 'Bitte gib deine E-Mail-Adresse ein.';
      if (!EMAIL_PATTERN.test(trimmed)) {
        return 'Bitte gib eine gültige E-Mail-Adresse ein, z. B. name@beispiel.de.';
      }
      return '';
    case 'subject':
      return value ? '' : 'Bitte wähle einen Betreff aus.';
    case 'message':
      if (!trimmed) return 'Bitte schreib uns eine Nachricht.';
      if (trimmed.length < 10) return 'Die Nachricht muss mindestens 10 Zeichen lang sein.';
      return '';
    default:
      return '';
  }
}

function validateForm(data) {
  const errors = {};
  FIELD_ORDER.forEach((field) => {
    const error = validateField(field, data[field]);
    if (error) errors[field] = error;
  });
  return errors;
}

function ContactForm() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | activation | error
  const fieldRefs = useRef({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Once a field shows an error, update it live while the user corrects it
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    const formErrors = validateForm(formData);
    setErrors(formErrors);
    const firstInvalid = FIELD_ORDER.find(field => formErrors[field]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid].focus();
      return;
    }

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
          Name: formData.name.trim(),
          email: formData.email.trim(),
          Betreff: subjectLabel,
          Nachricht: formData.message.trim(),
          _subject: `Website-Kontakt: ${subjectLabel} (von ${formData.name.trim()})`,
          _template: 'table',
          _honey: honeypot
        })
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || String(result.success) !== 'true') {
        const error = new Error(result.message || `HTTP ${response.status}`);
        error.needsActivation = /activat/i.test(result.message || '');
        throw error;
      }

      setStatus('sent');
      setFormData(EMPTY_FORM);
      setErrors({});
    } catch (error) {
      console.error('Contact form failed:', error.message);
      setStatus(error.needsActivation ? 'activation' : 'error');
    }
  };

  const fieldProps = (name) => ({
    id: name,
    name,
    value: formData[name],
    onChange: handleChange,
    onBlur: handleBlur,
    ref: (el) => { fieldRefs.current[name] = el; },
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    className: errors[name] ? 'has-error' : undefined
  });

  const fieldError = (name) => errors[name] && (
    <span className="field-error" id={`${name}-error`}>{errors[name]}</span>
  );

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
            <form onSubmit={handleSubmit} className="form-modern" noValidate>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Dein vollständiger Name"
                    {...fieldProps('name')}
                  />
                  {fieldError('name')}
                </div>

                <div className="form-field">
                  <label htmlFor="email">E-Mail *</label>
                  <input
                    type="email"
                    maxLength={254}
                    autoComplete="email"
                    placeholder="deine@email.de"
                    {...fieldProps('email')}
                  />
                  {fieldError('email')}
                </div>

                <div className="form-field full-width">
                  <label htmlFor="subject">Betreff *</label>
                  <select {...fieldProps('subject')}>
                    <option value="">Bitte wählen</option>
                    <option value="visit">Besuch planen</option>
                    <option value="prayer">Gebetsanliegen</option>
                    <option value="youth">Jugend</option>
                    <option value="general">Allgemeine Frage</option>
                    <option value="other">Sonstiges</option>
                  </select>
                  {fieldError('subject')}
                </div>
              </div>

              <div className="form-field full-width">
                <label htmlFor="message">Nachricht *</label>
                <textarea
                  maxLength={5000}
                  rows="6"
                  placeholder="Wie können wir dir helfen?"
                  {...fieldProps('message')}
                ></textarea>
                {fieldError('message')}
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

              {status === 'activation' && (
                <p className="form-error" role="alert">
                  Das Kontaktformular ist noch nicht freigeschaltet. Wir haben eine
                  Bestätigungs-E-Mail an die Gemeinde-Adresse geschickt. Sobald der
                  Link darin bestätigt ist, kommen Nachrichten an.
                </p>
              )}

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
