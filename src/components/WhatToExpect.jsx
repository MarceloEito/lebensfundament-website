import React from 'react';
import './WhatToExpect.css';

function WhatToExpect() {
  return (
    <section className="expect-modern" id="about">
      <div className="container-modern">
        <div className="expect-intro" data-aos="fade-up">
          <h2 className="section-title-large">Was dich bei uns erwartet</h2>
          <p className="expect-lead">
            Eine lebendige Gemeinschaft, die Jesus nachfolgt und gemeinsam im Glauben wächst.
          </p>
        </div>

        <div className="expect-prose" data-aos="fade-up">
          <p>
            Komm einfach wie du bist! Unser Gottesdienst dauert etwa 90 Minuten mit
            Lobpreis, Predigt und Gemeinschaft – und wir freuen uns darauf, dich
            persönlich kennenzulernen. Egal ob du zum ersten Mal dabei bist oder
            schon lange zu uns gehörst: Bei uns findest du einen Platz.
          </p>
          <p>
            Für Jugendliche und Teens gibt es eigene Treffen mit Lobpreis, Spielen,
            Gemeinschaft und biblischem Input – ein Ort, um im Glauben zu wachsen und
            Freundschaften zu knüpfen. Und wer tiefer eintauchen möchte, ist herzlich
            zu unseren Gebetszeiten sowie den regelmäßigen Frauen- und Männertagen
            eingeladen.
          </p>
          <p>
            Über allem steht der Wunsch, gemeinsam Jesus nachzufolgen und einander im
            Alltag zu tragen. Wir freuen uns auf dich!
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhatToExpect;
