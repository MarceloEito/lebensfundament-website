import React from 'react';
import './ServiceTimes.css';

function ServiceTimes() {
  const services = [
    {
      id: 1,
      title: 'Gottesdienst',
      day: 'Sonntag',
      time: '11:00',
      description: 'Predigt, Lobpreis & Gemeinschaft',
      icon: '✝️'
    },
    {
      id: 2,
      title: 'Gebetsstunde',
      day: 'Dienstag',
      time: '18:30',
      description: 'Gemeinsames Gebet',
      icon: '🙏'
    },
    {
      id: 3,
      title: 'Jugendtreff',
      day: 'Freitag',
      time: '19:00',
      description: 'Für Jugendliche & junge Erwachsene',
      icon: '🎸'
    }
  ];

  return (
    <section className="services-modern" id="services">
      <div className="container-modern">
        <div className="section-header">
          <h2 className="section-title">Unsere Veranstaltungen</h2>
          <p className="section-subtitle">Werde Teil unserer Gemeinschaft</p>
        </div>

        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card-modern">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <div className="service-time">
                <span className="service-day">{service.day}</span>
                <span className="service-hour">{service.time} Uhr</span>
              </div>
              <p className="service-description">{service.description}</p>
              <button className="service-btn">Mehr erfahren</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceTimes;
