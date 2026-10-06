import React, { useState } from 'react';
import './Events.css';

const CrossIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="3" y1="9" x2="21" y2="9" />
  </svg>
);

const PrayerHandsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
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

const SmileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
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
      title: 'Sonntagsgottesdienst',
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
      Icon: MusicIcon
    },
    {
      id: 4,
      title: 'Teens',
      day: 'Wöchentlich',
      time: 'Termin folgt',
      description: 'Für Teenager – Gemeinschaft, Spiele und biblischer Input',
      Icon: SmileIcon
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
