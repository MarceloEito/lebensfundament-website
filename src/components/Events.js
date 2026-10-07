import React, { useState } from 'react';
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

const MusicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
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

function Events() {
  const [activeTab, setActiveTab] = useState('regular');

  const upcomingEvents = [
    {
      id: 1,
      title: 'Gottesdienst',
      date: '2026-02-23',
      dayName: 'Sonntag',
      time: '11:00',
      location: 'Hauptsaal',
      description: 'Gemeinsamer Gottesdienst mit Lobpreis, Predigt und Abendmahl. Anschließend gemeinsames Mittagessen.',
      category: 'Gottesdienst',
      Icon: CrossIcon,
      image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80'
    },
    {
      id: 2,
      title: 'Gebetsstunde',
      date: '2026-02-25',
      dayName: 'Dienstag',
      time: '18:30',
      location: 'Gebetsraum',
      description: 'Gemeinsames Gebet für unsere Gemeinde, Stadt und Nation. Jeder ist willkommen!',
      category: 'Gebet',
      Icon: PrayerHandsIcon,
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80'
    },
    {
      id: 3,
      title: 'Jugend',
      date: '2026-02-28',
      dayName: 'Freitag',
      time: '19:00',
      location: 'Jugendraum',
      description: 'Lobpreis, Gemeinschaft und biblischer Input für Jugendliche ab 14 Jahren.',
      category: 'Jugend',
      Icon: MusicIcon,
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80'
    },
    {
      id: 4,
      title: 'Familien-Brunch',
      date: '2026-03-02',
      dayName: 'Sonntag',
      time: '10:00',
      location: 'Gemeindesaal',
      description: 'Gemeinsamer Brunch für Familien mit Kindern. Bitte ein Gericht mitbringen!',
      category: 'Gemeinschaft',
      Icon: UsersIcon,
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80'
    },
    {
      id: 5,
      title: 'Bibelstudium',
      date: '2026-03-05',
      dayName: 'Mittwoch',
      time: '19:30',
      location: 'Seminarraum',
      description: 'Vertieftes Studium des Römerbriefs. Für alle, die tiefer ins Wort eintauchen wollen.',
      category: 'Lehre',
      Icon: BookIcon,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80'
    }
  ];

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
      day: 'Wöchentlich',
      time: 'Termin folgt',
      description: 'Für Teenager – Gemeinschaft, Spiele und biblischer Input',
      Icon: LightningIcon
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('de-DE', { month: 'short' });
    return { day, month };
  };

  return (
    <section className="events-section" id="events">
      <div className="container-modern">
        <div className="section-header" data-aos="fade-up">
          <h2 className="section-title">Veranstaltungen</h2>
          <p className="section-subtitle">Entdecke was bei uns passiert und werde Teil unserer Gemeinschaft</p>
        </div>

        {/* Tabs */}
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

          {activeTab === 'upcoming' && (
            <div className="events-grid">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="event-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                >
                  {event.image && (
                    <div className="event-image" style={{ backgroundImage: `url(${event.image})` }}>
                      <div className="event-image-overlay"></div>
                    </div>
                  )}

                  <div className="event-date">
                    <span className="event-day">{formatDate(event.date).day}</span>
                    <span className="event-month">{formatDate(event.date).month}</span>
                  </div>

                  <div className="event-content">
                    <div className="event-header">
                      <span className="event-icon"><event.Icon /></span>
                      <span className="event-category">
                        {event.category}
                      </span>
                    </div>

                    <h3 className="event-title">{event.title}</h3>

                    <div className="event-meta">
                      <div className="meta-item">
                        <span className="meta-icon"><ClockIcon /></span>
                        <span>{event.dayName}, {event.time} Uhr</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-icon"><MapPinIcon /></span>
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <p className="event-description">{event.description}</p>

                    <button className="btn btn-outline" style={{ width: '100%' }}>
                      Mehr erfahren
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Events;
