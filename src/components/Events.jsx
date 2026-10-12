import React, { useEffect, useState } from 'react';
import eventsData from '../data/events.json';
import './Events.css';

// Phosphor Icons (Bold), https://phosphoricons.com
const CrossIcon = () => (
  <svg viewBox="0 0 256 256" fill="currentColor">
    <path d="M200,68H164V32a20,20,0,0,0-20-20H112A20,20,0,0,0,92,32V68H56A20,20,0,0,0,36,88v32a20,20,0,0,0,20,20H92v84a20,20,0,0,0,20,20h32a20,20,0,0,0,20-20V140h36a20,20,0,0,0,20-20V88A20,20,0,0,0,200,68Zm-4,48H152a12,12,0,0,0-12,12v92H116V128a12,12,0,0,0-12-12H60V92h44a12,12,0,0,0,12-12V36h24V80a12,12,0,0,0,12,12h44Z" />
  </svg>
);

// Phosphor Icons (Bold), https://phosphoricons.com
const PrayerHandsIcon = () => (
  <svg viewBox="0 0 256 256" fill="currentColor">
    <path d="M238.15,177.18l-35.53-35.53L166.45,22.3A25.75,25.75,0,0,0,128,8,25.75,25.75,0,0,0,89.55,22.3L53.38,141.65,17.85,177.18a20,20,0,0,0,0,28.28l32.69,32.69a20,20,0,0,0,28.28,0l48.29-48.28c.31-.31.6-.62.89-.94.29.32.58.63.89.94l48.29,48.28a20,20,0,0,0,28.28,0l32.69-32.69A20,20,0,0,0,238.15,177.18ZM64.68,218.35l-27-27,11-11,27,27ZM116,158.75a19.85,19.85,0,0,1-5.86,14.14L92.68,190.35l-27-27,6.83-6.83a11.94,11.94,0,0,0,3-5l37-122.23a1.78,1.78,0,0,1,3.48.52Zm47.5,31.78-17.64-17.64A19.85,19.85,0,0,1,140,158.75v-129a1.78,1.78,0,0,1,3.48-.52l37,122.23a11.94,11.94,0,0,0,3,5l7.6,7.6Zm27.82,27.82-10.85-10.84,27.63-26.44,10.25,10.25Z" />
  </svg>
);

const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// Phosphor Icons (Bold), https://phosphoricons.com
const UsersThreeIcon = () => (
  <svg viewBox="0 0 256 256" fill="currentColor">
    <path d="M164.38,181.1a52,52,0,1,0-72.76,0,75.89,75.89,0,0,0-30,28.89,12,12,0,0,0,20.78,12,53,53,0,0,1,91.22,0,12,12,0,1,0,20.78-12A75.89,75.89,0,0,0,164.38,181.1ZM100,144a28,28,0,1,1,28,28A28,28,0,0,1,100,144Zm147.21,9.59a12,12,0,0,1-16.81-2.39c-8.33-11.09-19.85-19.59-29.33-21.64a12,12,0,0,1-1.82-22.91,20,20,0,1,0-24.78-28.3,12,12,0,1,1-21-11.6,44,44,0,1,1,73.28,48.35,92.18,92.18,0,0,1,22.85,21.69A12,12,0,0,1,247.21,153.59Zm-192.28-24c-9.48,2.05-21,10.55-29.33,21.65A12,12,0,0,1,6.41,136.79,92.37,92.37,0,0,1,29.26,115.1a44,44,0,1,1,73.28-48.35,12,12,0,1,1-21,11.6,20,20,0,1,0-24.78,28.3,12,12,0,0,1-1.82,22.91Z" />
  </svg>
);

// Phosphor Icons (Bold), https://phosphoricons.com
const LightningIcon = () => (
  <svg viewBox="0 0 256 256" fill="currentColor">
    <path d="M219.71,117.38a12,12,0,0,0-7.25-8.52L161.28,88.39l10.59-70.61a12,12,0,0,0-20.64-10l-112,120a12,12,0,0,0,4.31,19.33l51.18,20.47L84.13,238.22a12,12,0,0,0,20.64,10l112-120A12,12,0,0,0,219.71,117.38ZM113.6,203.55l6.27-41.77a12,12,0,0,0-7.41-12.92L68.74,131.37,142.4,52.45l-6.27,41.77a12,12,0,0,0,7.41,12.92l43.72,17.49Z" />
  </svg>
);

// Event flyers are managed in the admin area (/admin, Sveltia CMS) and
// stored in src/data/events.json. A flyer shows until the end of its date.
const toIsoDate = (date) => [
  date.getFullYear(),
  String(date.getMonth() + 1).padStart(2, '0'),
  String(date.getDate()).padStart(2, '0')
].join('-');

const upcomingFlyers = () => {
  const today = toIsoDate(new Date());
  return (eventsData.events || [])
    .map((event) => ({ ...event, date: String(event.date || '').slice(0, 10) }))
    .filter((event) => event.image && event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
};

const formatEventDate = (isoDate) => {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('de-DE', {
    weekday: 'short',
    day: 'numeric',
    month: 'long'
  });
};

function Events() {
  const [activeTab, setActiveTab] = useState('regular');
  const [enlarged, setEnlarged] = useState(null);
  const flyers = upcomingFlyers();
  const showUpcoming = flyers.length > 0;

  // Enlarged flyer: close on Escape and lock page scroll
  useEffect(() => {
    if (!enlarged) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setEnlarged(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [enlarged]);

  const regularEvents = [
    {
      id: 1,
      title: 'Gottesdienst',
      day: 'Jeden Sonntag',
      time: '11:00 Uhr',
      description: 'Unser Hauptgottesdienst mit Lobpreis, Predigt und Gemeinschaft',
      Icon: CrossIcon
    },
    {
      id: 2,
      title: 'Gebetsstunde',
      day: 'Jeden Dienstag',
      time: '18:30 Uhr',
      description: 'Gemeinsames Gebet für Anliegen und Danksagung',
      Icon: PrayerHandsIcon
    },
    {
      id: 3,
      title: 'Jugend',
      day: 'Jeden Freitag',
      time: '19:00 Uhr',
      description: 'Für Jugendliche und junge Erwachsene',
      Icon: UsersThreeIcon
    },
    {
      id: 4,
      title: 'Teens',
      day: '14-tägig donnerstags',
      time: '18:00 Uhr',
      description: 'Für Teenager – Gemeinschaft, Spiele und biblischer Input',
      Icon: LightningIcon
    }
  ];

  return (
    <section className="events-section" id="events">
      <div className="container-modern">
        <div className="section-header" data-aos="fade-up">
          <h2 className="section-title">Veranstaltungen</h2>
          <p className="section-subtitle">Entdecke was bei uns passiert und werde Teil unserer Gemeinschaft</p>
        </div>

        {/* Tabs */}
        {showUpcoming && (
          <div className="events-tabs" data-aos="fade-up">
            <button
              className={`tab-btn ${activeTab === 'regular' ? 'active' : ''}`}
              onClick={() => setActiveTab('regular')}
            >
              <span className="tab-icon"><RefreshIcon /></span>
              Regelmäßige Termine
            </button>
            <button
              className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              <span className="tab-icon"><CalendarIcon /></span>
              Kommende Events
            </button>
          </div>
        )}

        {/* Content */}
        <div className="events-content">
          {activeTab === 'regular' && (
            <div className="regular-events-grid">
              {regularEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="regular-event-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                >
                  <div className="regular-icon-wrap">
                    <event.Icon />
                  </div>
                  <h3 className="regular-title">{event.title}</h3>
                  <div className="regular-time">
                    <strong>{event.day}</strong>
                    <span>{event.time}</span>
                  </div>
                  <p className="regular-description">{event.description}</p>
                </div>
              ))}
            </div>
          )}

          {showUpcoming && activeTab === 'upcoming' && (
            <div className="flyer-grid">
              {flyers.map((flyer, index) => (
                <figure
                  key={`${flyer.date}-${flyer.image}`}
                  className="flyer-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                >
                  <button
                    type="button"
                    className="flyer-image-button"
                    onClick={() => setEnlarged(flyer)}
                    aria-label={`${flyer.title || 'Flyer'} groß anzeigen`}
                  >
                    <img src={flyer.image} alt={flyer.title || 'Event-Flyer'} loading="lazy" />
                  </button>
                  <figcaption>
                    <span className="flyer-date">{formatEventDate(flyer.date)}</span>
                    {flyer.title && <span className="flyer-title">{flyer.title}</span>}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>

      {enlarged && (
        <div
          className="flyer-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={enlarged.title || 'Event-Flyer'}
          onClick={() => setEnlarged(null)}
        >
          <img src={enlarged.image} alt={enlarged.title || 'Event-Flyer'} />
          <button type="button" className="flyer-lightbox-close" aria-label="Schließen">×</button>
        </div>
      )}
    </section>
  );
}

export default Events;
