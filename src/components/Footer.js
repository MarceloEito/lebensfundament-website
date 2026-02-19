import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-modern">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Lebensfundament</h3>
            <p>Jesus ist unser Lebensfundament</p>
          </div>

          <div className="footer-section">
            <h4>Kontakt</h4>
            <p>Eichenhübel 14</p>
            <p>66892 Bruchmühlbach-Miesau</p>
          </div>

          <div className="footer-section">
            <h4>Gottesdienste</h4>
            <p>Sonntag: 11:00 Uhr</p>
            <p>Dienstag: 18:30 Uhr (Gebet)</p>
            <p>Freitag: 19:00 Uhr (Jugend)</p>
          </div>

          <div className="footer-section">
            <h4>Folge uns</h4>
            <div className="social-links">
              <a href="#instagram" aria-label="Instagram">📷</a>
              <a href="#facebook" aria-label="Facebook">📘</a>
              <a href="#youtube" aria-label="YouTube">📺</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Kirche Lebensfundament. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
