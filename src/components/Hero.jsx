import React, { useState } from 'react';
import './Hero.css';

function Hero() {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="hero-modern" id="home">
      {/* Video Background */}
      <div className="hero-video-container">
        {!videoError ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/videos/background-poster.jpg"
            className="hero-video"
            onError={() => setVideoError(true)}
          >
            <source
              src="/videos/background.mp4"
              type="video/mp4"
            />
          </video>
        ) : (
          <div
            className="hero-fallback-image"
            style={{
              backgroundImage: "url('/videos/background-poster.jpg')"
            }}
          ></div>
        )}
        <div className="video-overlay"></div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-subtitle">Willkommen bei</p>
          <h1 className="hero-title">LEBENSFUNDAMENT</h1>
          <p className="hero-motto">"Jesus ist unser Lebensfundament"</p>
          <div className="hero-buttons">
            <a href="#location" className="btn btn-fill btn-lg">Gottesdienst besuchen</a>
            <a href="#about" className="btn btn-outline btn-lg">Mehr erfahren</a>
          </div>
        </div>
      </div>

      <div className="hero-info-bar">
        <div className="info-item">
          <span className="info-label">Nächster Gottesdienst</span>
          <span className="info-value">Sonntag 11:00 Uhr</span>
        </div>
        <div className="info-divider"></div>
        <div className="info-item">
          <span className="info-label">Standort</span>
          <span className="info-value">Bruchmühlbach-Miesau</span>
        </div>
        <div className="info-divider"></div>
        <div className="info-item">
          <span className="info-label">Alle sind willkommen</span>
          <span className="info-value">Komm wie du bist</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
