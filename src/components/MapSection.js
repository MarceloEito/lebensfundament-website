import React, { useState } from 'react';
import './MapSection.css';

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="2" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const NavigationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

function MapSection() {
  const [activeLocation, setActiveLocation] = useState('address');

  const addressMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2583.5!2d7.458428407087288!3d49.38423161398556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4795df004a044307%3A0xe6d14f2ebc305347!2sFreie%20ev.%20Gemeinde%20Lebensfundament%20e.V.!5e0!3m2!1sde!2sde!4v1771491159446!5m2!1sde!2sde";

  const parkingMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1298.6322142726885!2d7.4563654826162145!3d49.38498978615344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x410c9d9129d4f0d9%3A0x45b6770e5df8224c!2sGanztagsgrundschule%20Bruchm%C3%BChlbach-Martinsh%C3%B6he!5e0!3m2!1sde!2sde!4v1771535347158!5m2!1sde!2sde";

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
              <div
                className={`location-card location-card-clickable ${activeLocation === 'address' ? 'active' : ''}`}
                onClick={() => setActiveLocation('address')}
              >
                <div className="location-icon"><MapPinIcon /></div>
                <div className="location-details">
                  <h4>Adresse</h4>
                  <p>Eichenhübel 14</p>
                  <p>66892 Bruchmühlbach-Miesau</p>
                </div>
              </div>


              <div
                className={`location-card location-card-clickable ${activeLocation === 'parking' ? 'active' : ''}`}
                onClick={() => setActiveLocation('parking')}
              >
                <div className="location-icon"><CarIcon /></div>
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
              <NavigationIcon />
              Route berechnen
            </a>
          </div>
        </div>

        <div className="map-embed">
          <iframe
            title={activeLocation === 'address' ? 'Kirche Lebensfundament Standort' : 'Parkplatz'}
            src={activeLocation === 'address' ? addressMapUrl : parkingMapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            key={activeLocation}
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default MapSection;
