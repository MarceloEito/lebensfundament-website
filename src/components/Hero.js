import React, { useState } from 'react';
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
              src="/videos/background.mp4"
              type="video/mp4"
            />
          </video>
        ) : (
          <div
            className="hero-fallback-image"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80')`
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
            <a href="#services" className="btn btn-fill btn-lg">Gottesdienst besuchen</a>
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
    </div>
  );
}

export default Hero;
