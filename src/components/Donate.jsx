import React, { useEffect, useRef, useState } from 'react';
import './Donate.css';
import paypalQr from '../assets/paypal-qr.svg';
import giroCode from '../assets/girocode.svg';

const IBAN = 'DE03 5405 0220 0006 0257 12';
const PAYPAL_URL = 'https://www.paypal.com/qrcodes/managed/68970732-67ce-4d7d-bbc0-0c1c28f5734c?utm_source=payandgetpaid';

// Phosphor Icons (Bold), https://phosphoricons.com
const HandHeartIcon = () => (
  <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M232.76,137.88a28.66,28.66,0,0,0-12-5.39C236.19,114.94,244,97.37,244,80c0-28.67-23.09-52-51.46-52A51.77,51.77,0,0,0,156,42.85,51.77,51.77,0,0,0,119.46,28C91.09,28,68,51.33,68,80c0,10.15,2.72,20.3,8.22,30.7a35.9,35.9,0,0,0-11.73,7.84L43,140H20A20,20,0,0,0,0,160v40a20,20,0,0,0,20,20H120a11.89,11.89,0,0,0,2.91-.36l64-16a11.4,11.4,0,0,0,1.79-.6l38.82-16.54c.23-.09.45-.19.67-.3a28.61,28.61,0,0,0,4.57-48.32ZM119.46,52A27.18,27.18,0,0,1,144.9,68.56a12,12,0,0,0,22.2,0A27.18,27.18,0,0,1,192.54,52C207.42,52,220,64.82,220,80c0,18.06-15,38.84-43.38,60.19L172,141.26c0-.42,0-.84,0-1.26a32,32,0,0,0-32-32H102.71C95.42,97.76,92,88.77,92,80,92,64.82,104.58,52,119.46,52ZM24,164H36v32H24Zm193.68.61-37.51,16L118.52,196H60V157l21.46-21.46A11.93,11.93,0,0,1,89.94,132H140a8,8,0,0,1,0,16H112a12,12,0,0,0,0,24h32a12.19,12.19,0,0,0,2.69-.3l67-15.41.47-.12a4.61,4.61,0,0,1,5.82,4.44A4.58,4.58,0,0,1,217.68,164.61Z" />
  </svg>
);

// Phosphor Icons (Bold), https://phosphoricons.com
const BankIcon = () => (
  <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M24,108H44v48H32a12,12,0,0,0,0,24H224a12,12,0,0,0,0-24H212V108h20a12,12,0,0,0,6.29-22.22l-104-64a12,12,0,0,0-12.58,0l-104,64A12,12,0,0,0,24,108Zm44,0H92v48H68Zm72,0v48H116V108Zm48,48H164V108h24ZM128,46.09,189.6,84H66.4ZM252,208a12,12,0,0,1-12,12H16a12,12,0,0,1,0-24H240A12,12,0,0,1,252,208Z" />
  </svg>
);

// Phosphor Icons (Bold), https://phosphoricons.com
const PaypalIcon = () => (
  <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M223.27,91.08a59.82,59.82,0,0,0-19.5-16.27A60,60,0,0,0,144,20H84A20,20,0,0,0,64.6,35.15l-36,144A20,20,0,0,0,48,204H70.39l-1.79,7.15A20,20,0,0,0,88,236h31.5a20,20,0,0,0,19.4-15.15L147.13,188H176a60,60,0,0,0,47.29-96.92ZM87.13,44H144a35.77,35.77,0,0,1,28.37,13.85A36.18,36.18,0,0,1,178,68.06c-.66,0-1.31-.06-2-.06H120A20,20,0,0,0,100.6,83.15L76.39,180H53.13Zm90.76,48.05A35.93,35.93,0,0,1,144,116H117.13l6-24H176C176.62,92,177.26,92,177.89,92.05Zm33,44.68A35.94,35.94,0,0,1,176,164H144a20,20,0,0,0-19.4,15.15L116.39,212H93.13l18-72H144a59.89,59.89,0,0,0,56.1-38.75,36.12,36.12,0,0,1,10.82,35.48Z" />
  </svg>
);

// Phosphor Icons (Bold), https://phosphoricons.com
const CopyIcon = () => (
  <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M216,28H88A12,12,0,0,0,76,40V76H40A12,12,0,0,0,28,88V216a12,12,0,0,0,12,12H168a12,12,0,0,0,12-12V180h36a12,12,0,0,0,12-12V40A12,12,0,0,0,216,28ZM156,204H52V100H156Zm48-48H180V88a12,12,0,0,0-12-12H100V52H204Z" />
  </svg>
);

// Phosphor Icons (Bold), https://phosphoricons.com
const CheckIcon = () => (
  <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z" />
  </svg>
);

// Phosphor Icons (Bold), https://phosphoricons.com
const ExternalIcon = () => (
  <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M228,104a12,12,0,0,1-24,0V69l-59.51,59.51a12,12,0,0,1-17-17L187,52H152a12,12,0,0,1,0-24h64a12,12,0,0,1,12,12Zm-44,24a12,12,0,0,0-12,12v64H52V84h64a12,12,0,0,0,0-24H48A20,20,0,0,0,28,80V208a20,20,0,0,0,20,20H176a20,20,0,0,0,20-20V140A12,12,0,0,0,184,128Z" />
  </svg>
);

function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked: the IBAN stays selectable, so it can be copied by hand
      setCopied(false);
    }
  };

  return (
    <button type="button" className={`copy-btn${copied ? ' copied' : ''}`} onClick={copy} aria-label={label}>
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span aria-live="polite">{copied ? 'Kopiert' : 'Kopieren'}</span>
    </button>
  );
}

function Donate() {
  return (
    <section className="donate-section" id="spenden">
      <div className="donate-container">
        <div className="donate-header" data-aos="fade-up">
          <span className="donate-badge"><HandHeartIcon /></span>
          <h2 className="section-title">Spenden</h2>
          <p className="section-subtitle">
            Unsere Gemeinde lebt davon, dass Menschen mitgeben. Wenn du unsere
            Arbeit unterstützen möchtest, freuen wir uns über deine Spende.
          </p>
        </div>

        <div className="donate-grid">
          <article className="donate-card" data-aos="fade-up">
            <div className="donate-card-head">
              <span className="donate-icon"><BankIcon /></span>
              <div>
                <h3>Überweisung</h3>
                <p>Direkt auf unser Vereinskonto</p>
              </div>
            </div>

            <dl className="bank-details">
              <div className="bank-row bank-row-wide">
                <dt>Empfänger</dt>
                <dd>Lebensfundament e.V.</dd>
              </div>
              <div className="bank-row bank-row-wide bank-row-iban">
                <dt>IBAN</dt>
                <dd>
                  <span className="iban">{IBAN}</span>
                  <CopyButton value={IBAN.replace(/\s/g, '')} label="IBAN kopieren" />
                </dd>
              </div>
              <div className="bank-row">
                <dt>BIC</dt>
                <dd>MALADE51KLK</dd>
              </div>
              <div className="bank-row">
                <dt>Bank</dt>
                <dd>Sparkasse Kaiserslautern</dd>
              </div>
              <div className="bank-row bank-row-wide">
                <dt>Verwendungszweck</dt>
                <dd>Spende</dd>
              </div>
            </dl>

            <div className="donate-qr">
              <img src={giroCode} alt="GiroCode für eine Überweisung an Lebensfundament e.V." width="132" height="132" loading="lazy" />
              <p>
                <strong>GiroCode</strong>
                Mit der Banking-App scannen: Empfänger, IBAN und
                Verwendungszweck werden automatisch übernommen.
              </p>
            </div>
          </article>

          <article className="donate-card" data-aos="fade-up" data-aos-delay="80">
            <div className="donate-card-head">
              <span className="donate-icon"><PaypalIcon /></span>
              <div>
                <h3>PayPal</h3>
                <p>Schnell und bequem online</p>
              </div>
            </div>

            <p className="donate-text">
              Mit PayPal kannst du ganz einfach per App oder im Browser spenden.
            </p>

            <a className="btn btn-fill paypal-btn" href={PAYPAL_URL} target="_blank" rel="noopener noreferrer">
              <PaypalIcon />
              Mit PayPal spenden
              <ExternalIcon />
            </a>
            <p className="donate-note">Du wirst zur Website von PayPal weitergeleitet.</p>

            <div className="donate-qr">
              <img src={paypalQr} alt="QR-Code für eine Spende mit PayPal" width="132" height="132" loading="lazy" />
              <p>
                <strong>QR-Code</strong>
                Mit der Handykamera oder der PayPal-App scannen.
              </p>
            </div>
          </article>
        </div>

        <blockquote className="donate-verse" data-aos="fade-up">
          „Einen fröhlichen Geber hat Gott lieb.“
          <cite>2. Korinther 9,7</cite>
        </blockquote>
      </div>
    </section>
  );
}

export default Donate;
