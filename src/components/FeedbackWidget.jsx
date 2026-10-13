import React, { useEffect, useRef, useState } from 'react';
import { sendForm } from '../forms';
import './FeedbackWidget.css';

// Phosphor Icons (Bold), https://phosphoricons.com
const ChatIcon = () => (
  <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M172,108a12,12,0,0,1-12,12H96a12,12,0,0,1,0-24h64A12,12,0,0,1,172,108Zm-12,28H96a12,12,0,0,0,0,24h64a12,12,0,0,0,0-24Zm76-8A108,108,0,0,1,78.77,224.15L46.34,235A20,20,0,0,1,21,209.66l10.81-32.43A108,108,0,1,1,236,128Zm-24,0A84,84,0,1,0,55.27,170.06a12,12,0,0,1,1,9.81l-9.93,29.79,29.79-9.93a12.1,12.1,0,0,1,3.8-.62,12,12,0,0,1,6,1.62A84,84,0,0,0,212,128Z" />
  </svg>
);

const AREAS = [
  'Allgemein',
  'Startseite',
  'Was dich bei uns erwartet',
  'Veranstaltungen',
  'Besuche uns / Karte',
  'Kontaktformular',
  'Impressum / Datenschutz',
  'Darstellung auf dem Handy',
  'Sonstiges'
];

// The feedback button is only meant for the test phase: it shows on the
// Netlify test address and in local development, not on the real domain.
const isTestVersion = () => {
  const host = window.location.hostname;
  return host.endsWith('.netlify.app') || host === 'localhost' || host === '127.0.0.1';
};

// Rough device description so layout problems can be reproduced
const deviceInfo = () => {
  const ua = navigator.userAgent;
  const device = /iPhone|iPad/.test(ua) ? 'iPhone/iPad'
    : /Android/.test(ua) ? 'Android'
    : /Macintosh/.test(ua) ? 'Mac'
    : /Windows/.test(ua) ? 'Windows'
    : 'Sonstiges';
  return `${device}, Bildschirm ${window.innerWidth} × ${window.innerHeight} px`;
};

function FeedbackDialog() {
  const [open, setOpen] = useState(false);
  const [area, setArea] = useState(AREAS[0]);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const buttonRef = useRef(null);
  const dialogRef = useRef(null);

  const close = () => {
    setOpen(false);
    setStatus((current) => (current === 'sent' ? 'idle' : current));
    buttonRef.current?.focus();
  };

  // While open: close on Escape, lock page scroll, move focus into the dialog
  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (message.trim().length < 3) {
      setError('Bitte schreib kurz, was dir aufgefallen ist.');
      return;
    }
    setError('');
    setStatus('sending');

    try {
      await sendForm('feedback', {
        bereich: area,
        feedback: message.trim(),
        geraet: deviceInfo(),
        seite: window.location.href,
        subject: `Website-Feedback: ${area}`,
        'bot-field': honeypot
      });
      setStatus('sent');
      setMessage('');
      setArea(AREAS[0]);
    } catch (err) {
      console.error('Feedback failed:', err.message);
      setStatus('error');
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="feedback-button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
      >
        <ChatIcon />
        Feedback
      </button>

      {open && (
        <div className="feedback-backdrop" onClick={close}>
          <div
            ref={dialogRef}
            className="feedback-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-title"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="feedback-close" onClick={close} aria-label="Schließen">
              ×
            </button>

            {status === 'sent' ? (
              <div className="feedback-thanks">
                <div className="feedback-thanks-icon">✓</div>
                <h2 id="feedback-title">Danke für dein Feedback!</h2>
                <p>Deine Rückmeldung ist angekommen und hilft uns, die Website besser zu machen.</p>
                <div className="feedback-actions">
                  <button type="button" className="btn btn-outline" onClick={() => setStatus('idle')}>
                    Weiteres Feedback
                  </button>
                  <button type="button" className="btn btn-fill" onClick={close}>
                    Schließen
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h2 id="feedback-title">Feedback zur neuen Website</h2>
                <p className="feedback-intro">
                  Das ist eine Testversion. Was gefällt dir, was fehlt, was funktioniert
                  nicht? Jede Rückmeldung hilft uns.
                </p>

                <label className="feedback-field">
                  <span>Worum geht es?</span>
                  <select value={area} onChange={(e) => setArea(e.target.value)}>
                    {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </label>

                <label className="feedback-field">
                  <span>Dein Feedback *</span>
                  <textarea
                    rows="5"
                    maxLength={3000}
                    value={message}
                    onChange={(e) => { setMessage(e.target.value); if (error) setError(''); }}
                    placeholder="Z. B. „Auf dem Handy ist der Text zu klein“ oder „Die Bilder gefallen mir“"
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? 'feedback-error' : undefined}
                  />
                  {error && <span className="feedback-error" id="feedback-error">{error}</span>}
                </label>

                {/* Hidden from people; Netlify rejects submissions that fill it */}
                <input
                  type="text"
                  name="bot-field"
                  className="form-honeypot"
                  tabIndex="-1"
                  autoComplete="off"
                  aria-hidden="true"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />

                {status === 'error' && (
                  <p className="feedback-status" role="alert">
                    Das hat leider nicht geklappt. Bitte versuche es später noch einmal.
                  </p>
                )}

                <button type="submit" className="btn btn-fill feedback-submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Wird gesendet …' : 'Feedback senden'}
                </button>
                <p className="feedback-note">
                  Geht an das Website-Team. Gerätetyp und
                  Bildschirmgröße werden mitgesendet, damit wir Darstellungsfehler
                  nachvollziehen können.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function FeedbackWidget() {
  return isTestVersion() ? <FeedbackDialog /> : null;
}

export default FeedbackWidget;
