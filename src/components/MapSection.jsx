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

// Phosphor Icons (Bold), https://phosphoricons.com
const HandTapIcon = () => (
  <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M228,156v36c0,13.85-1.63,26.52-4.58,35.68a12,12,0,1,1-22.84-7.36c2.14-6.65,3.42-17.24,3.42-28.32V156a8,8,0,0,0-16,0v4a12,12,0,0,1-24,0V140a8,8,0,0,0-16,0v12a12,12,0,0,1-24,0V84a8,8,0,0,0-16,0V192a12,12,0,0,1-22.18,6.34l-18.68-30-.21-.34A8,8,0,0,0,53,175.92L78.27,217.8a12,12,0,0,1-20.56,12.39l-25.31-42-.12-.2A32,32,0,0,1,84,150.83V84a32,32,0,0,1,64,0v25a32,32,0,0,1,36.78,17A32,32,0,0,1,228,156ZM56,96A12,12,0,0,0,68,84a48,48,0,0,1,96,0,12,12,0,0,0,24,0A72,72,0,0,0,44,84,12,12,0,0,0,56,96Z" />
  </svg>
);

// Phosphor Icons (Bold), https://phosphoricons.com
const ArrowRightIcon = () => (
  <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z" />
  </svg>
);

// Phosphor Icons (Bold), https://phosphoricons.com
const CheckIcon = () => (
  <svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z" />
  </svg>
);

const NavigationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

function MapSection() {
  const [activeLocation, setActiveLocation] = useState('address');
  // Google Maps sets cookies and receives the visitor's IP address, so the
  // map only loads after the visitor explicitly asks for it.
  const [mapLoaded, setMapLoaded] = useState(false);

  const addressMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2583.5!2d7.458428407087288!3d49.38423161398556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4795df004a044307%3A0xe6d14f2ebc305347!2sFreie%20ev.%20Gemeinde%20Lebensfundament%20e.V.!5e0!3m2!1sde!2sde!4v1771491159446!5m2!1sde!2sde";

  const parkingMapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1298.6322142726885!2d7.4563654826162145!3d49.38498978615344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x410c9d9129d4f0d9%3A0x45b6770e5df8224c!2sGanztagsgrundschule%20Bruchm%C3%BChlbach-Martinsh%C3%B6he!5e0!3m2!1sde!2sde!4v1771535347158!5m2!1sde!2sde";

  const transitMapUrl = `https://www.google.com/maps?q=${encodeURIComponent('Bahnhof Bruchmühlbach, 66892 Bruchmühlbach-Miesau')}&z=16&output=embed`;

  const places = [
    {
      id: 'address',
      Icon: MapPinIcon,
      title: 'Adresse',
      lines: ['Eichenhübel 12a', '66892 Bruchmühlbach-Miesau'],
      question: 'Wo ist die Kirche?',
      mapUrl: addressMapUrl,
      mapTitle: 'Kirche Lebensfundament Standort'
    },
    {
      id: 'parking',
      Icon: CarIcon,
      title: 'Parken',
      lines: ['Kostenlose Parkplätze', 'vor Ort verfügbar'],
      question: 'Wo kann ich parken?',
      mapUrl: parkingMapUrl,
      mapTitle: 'Parkplatz'
    },
    {
      id: 'transit',
      Icon: TrainIcon,
      title: 'Nahverkehr',
      lines: ['Bahnhof Bruchmühlbach', 'Anreise mit Bus und Bahn'],
      question: 'Wo ist der Bahnhof?',
      mapUrl: transitMapUrl,
      mapTitle: 'Bahnhof Bruchmühlbach'
    }
  ];
  const activePlace = places.find((place) => place.id === activeLocation);

  const address = "Eichenhübel 12a, 66892 Bruchmühlbach-Miesau, Germany";
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

            <p className="map-hint">
              <HandTapIcon />
              <span>
                Tipp: Wähle einfach einen Ort aus – die Karte
                <span className="map-hint-side"> rechts </span>
                <span className="map-hint-below"> weiter unten </span>
                zeigt dir dann, wo er liegt.
              </span>
            </p>

            <div className="location-cards">
              {places.map(({ id, Icon, title, lines }) => {
                const active = activeLocation === id;
                return (
                  <button
                    type="button"
                    key={id}
                    className={`location-card ${active ? 'active' : ''}`}
                    aria-pressed={active}
                    onClick={() => setActiveLocation(id)}
                  >
                    <span className="location-icon"><Icon /></span>
                    <span className="location-details">
                      <span className="location-title">{title}</span>
                      {lines.map((line) => (
                        <span className="location-line" key={line}>{line}</span>
                      ))}
                      <span className="location-show">
                        {active ? (
                          <><CheckIcon /> Jetzt auf der Karte</>
                        ) : (
                          <>Auf der Karte zeigen <ArrowRightIcon /></>
                        )}
                      </span>
                    </span>
                  </button>
                );
              })}
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
          {mapLoaded ? (
            <iframe
              title={activePlace.mapTitle}
              src={activePlace.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              key={activeLocation}
            ></iframe>
          ) : (
            <div className="map-consent">
              <div className="map-consent-icon"><MapPinIcon /></div>
              <h3>{activePlace.question}</h3>
              <p className="map-consent-lead">
                Lade die Karte, dann siehst du es auf einen Blick.
              </p>
              <p>
                Die Karte kommt von Google Maps. Dabei werden Daten wie deine
                IP-Adresse an Google übertragen und Cookies gesetzt. Mehr dazu in
                unserer <a href="/datenschutz/">Datenschutzerklärung</a>.
              </p>
              <button type="button" className="btn btn-fill" onClick={() => setMapLoaded(true)}>
                Karte laden
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MapSection;
