import React from 'react';
import './WhatToExpect.css';

function WhatToExpect() {
  const sections = [
    {
      id: 1,
      title: 'Erstbesucher',
      description: 'Kommen Sie wie Sie sind! Unser Gottesdienst dauert etwa 90 Minuten mit Lobpreis, Predigt und Gemeinschaft. Wir freuen uns darauf, Sie kennenzulernen.',
      image: '👋'
    },
    {
      id: 2,
      title: 'Jugend',
      description: 'Jeden Freitag um 19:00 Uhr treffen sich unsere Jugendlichen zu Lobpreis, Gemeinschaft und biblischem Input. Ein Ort zum Wachsen im Glauben und Freundschaften knüpfen.',
      image: '🎯'
    },
    {
      id: 3,
      title: 'Gebet & Gemeinschaft',
      description: 'Dienstags um 18:30 Uhr kommen wir zum gemeinsamen Gebet zusammen. Außerdem gibt es regelmäßig Frauen- und Männertage für tiefere Gemeinschaft.',
      image: '💫'
    }
  ];

  return (
    <section className="expect-modern" id="about">
      <div className="container-modern">
        <div className="expect-intro">
          <h2 className="section-title-large">Was dich bei uns erwartet</h2>
          <p className="expect-lead">
            Eine lebendige Gemeinschaft, die Jesus nachfolgt und gemeinsam im Glauben wächst.
          </p>
        </div>

        <div className="expect-content">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`expect-block ${index % 2 === 1 ? 'reverse' : ''}`}
            >
              <div className="expect-visual">
                <div className="expect-icon-large">{section.image}</div>
              </div>
              <div className="expect-text">
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatToExpect;
