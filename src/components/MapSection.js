import React from 'react';
import './MapSection.css';

function MapSection() {
  // Adjusted Google Maps embed URL with better zoom level (changed from very close to moderate zoom)
  // Original had very close zoom, now adjusted to show more context of the area
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2583.5!2d7.458428407087288!3d49.38423161398556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4795df004a044307%3A0xe6d14f2ebc305347!2sFreie%20ev.%20Gemeinde%20Lebensfundament%20e.V.!5e0!3m2!1sde!2sde!4v1771491159446!5m2!1sde!2sde";

  const address = "Eichenhübel 14, 66892 Bruchmühlbach-Miesau, Germany";
  const encodedAddress = encodeURIComponent(address);

  return (
    <section className="map-modern" id="location">
      <div className="map-split">
        <div className="map-info">
          <div className="map-info-content">
            <h2>Besuche uns</h2>
            <p className="map-intro">
              Wir freuen uns darauf, dich persönlich kennenzulernen!
            </p>

            <div className="location-cards">
              <div className="location-card">
                <div className="location-icon">📍</div>
                <div className="location-details">
                  <h4>Adresse</h4>
                  <p>Eichenhübel 14</p>
                  <p>66892 Bruchmühlbach-Miesau</p>
                </div>
              </div>

              <div className="location-card">
                <div className="location-icon">⏰</div>
                <div className="location-details">
                  <h4>Gottesdienst</h4>
                  <p>Jeden Sonntag</p>
                  <p>11:00 Uhr</p>
                </div>
              </div>

              <div className="location-card">
                <div className="location-icon">🚗</div>
                <div className="location-details">
                  <h4>Parken</h4>
                  <p>Kostenlose Parkplätze</p>
                  <p>vor Ort verfügbar</p>
                </div>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="route-btn"
            >
              Route berechnen
            </a>
          </div>
        </div>

        <div className="map-embed">
          <iframe
            title="Kirche Lebensfundament Standort"
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default MapSection;
