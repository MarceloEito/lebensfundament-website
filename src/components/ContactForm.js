import React, { useState } from 'react';
import './ContactForm.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);

    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="contact-modern" id="contact">
      <div className="container-modern">
        <div className="contact-header" data-aos="fade-up">
          <h2>Kontaktiere uns</h2>
          <p>Hast du Fragen oder möchtest mehr erfahren? Wir sind für dich da!</p>
        </div>

        <div className="contact-wrapper" data-aos="fade-up">
          {submitted ? (
            <div className="success-modern">
              <div className="success-icon">✓</div>
              <h3>Vielen Dank!</h3>
              <p>Deine Nachricht wurde erfolgreich gesendet. Wir melden uns bald bei dir.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form-modern">
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
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
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Wie können wir dir helfen?"
                ></textarea>
              </div>

              <div className="form-submit-wrap">
                <button type="submit" className="btn btn-fill btn-lg" style={{ width: '100%' }}>
                  Nachricht senden
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
