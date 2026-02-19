import React, { useState, useEffect } from 'react';
import './Hero.css';

function Hero() {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="hero-modern">
      {/* Video Background */}
      <div className="hero-video-container">
        {!videoError ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video"
            onError={() => setVideoError(true)}
          >
            <source
              src="https://cdn.pixabay.com/vimeo/394298939/city-24904.mp4?width=1280&hash=af186c9bb296f905b185b8f36c3498ab8a1123bc"
              type="video/mp4"
            />
          </video>
        ) : (
          <div className="hero-fallback-image"></div>
        )}
        <div className="video-overlay"></div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-subtitle">Willkommen bei</p>
          <h1 className="hero-title">KIRCHE<br/>LEBENSFUNDAMENT</h1>
          <p className="hero-motto">"Jesus ist unser Lebensfundament"</p>
          <div className="hero-buttons">
            <button className="btn-primary">Gottesdienst besuchen</button>
            <button className="btn-secondary">Mehr erfahren</button>
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
    </div>
  );
}

export default Hero;
