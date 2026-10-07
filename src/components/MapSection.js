import React, { useState } from 'react';
import './MapSection.css';

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// Phosphor Icons (Bold), https://phosphoricons.com
const CarIcon = () => (
  <svg viewBox="0 0 256 256" fill="currentColor">
    <path d="M240,100h-8.2L205.08,39.88A20,20,0,0,0,186.8,28H69.2A20,20,0,0,0,50.92,39.88L24.2,100H16a12,12,0,0,0,0,24h4v76a20,20,0,0,0,20,20H68a20,20,0,0,0,20-20V180h80v20a20,20,0,0,0,20,20h28a20,20,0,0,0,20-20V124h4a12,12,0,0,0,0-24ZM71.8,52H184.2l21.33,48H50.47ZM64,196H44V180H64Zm128,0V180h20v16Zm20-40H44V124H212Z" />
  </svg>
);

// Phosphor Icons (Bold), https://phosphoricons.com
const TrainIcon = () => (
  <svg viewBox="0 0 256 256" fill="currentColor">
    <path d="M184,20H72A36,36,0,0,0,36,56V184a36,36,0,0,0,36,36h0l-9.6,12.8a12,12,0,1,0,19.2,14.4L102,220h52l20.4,27.2a12,12,0,0,0,19.2-14.4L184,220h0a36,36,0,0,0,36-36V56A36,36,0,0,0,184,20ZM60,116V84h56v32Zm80-32h56v32H140ZM72,44H184a12,12,0,0,1,12,12v4H60V56A12,12,0,0,1,72,44ZM184,196H72a12,12,0,0,1-12-12V140H196v44A12,12,0,0,1,184,196Zm-80-28a16,16,0,1,1-16-16A16,16,0,0,1,104,168Zm80,0a16,16,0,1,1-16-16A16,16,0,0,1,184,168Z" />
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

  const transitMapUrl = `https://www.google.com/maps?q=${encodeURIComponent('Bahnhof Bruchmühlbach, 66892 Bruchmühlbach-Miesau')}&z=16&output=embed`;

  const maps = {
    address: { url: addressMapUrl, title: 'Kirche Lebensfundament Standort' },
    parking: { url: parkingMapUrl, title: 'Parkplatz' },
    transit: { url: transitMapUrl, title: 'Bahnhof Bruchmühlbach' }
  };

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

              <div
                className={`location-card location-card-clickable ${activeLocation === 'transit' ? 'active' : ''}`}
                onClick={() => setActiveLocation('transit')}
              >
                <div className="location-icon"><TrainIcon /></div>
                <div className="location-details">
                  <h4>Nahverkehr</h4>
                  <p>Bahnhof Bruchmühlbach</p>
                  <p>Anreise mit Bus und Bahn</p>
                </div>
              </div>
            </div>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}${activeLocation === 'transit' ? '&travelmode=transit' : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="route-btn"
            >
              <NavigationIcon />
              {activeLocation === 'transit' ? 'Route mit Bahn' : 'Route berechnen'}
            </a>
          </div>
        </div>

        <div className="map-embed">
          <iframe
            title={maps[activeLocation].title}
            src={maps[activeLocation].url}
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
