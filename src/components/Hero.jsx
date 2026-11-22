import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

function Hero() {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  // iOS Safari blocks autoplay in Low Power Mode (and when data saving is
  // on) and then shows its native play button over the video. React only
  // sets `muted` as a property, so set it explicitly as well, try to start
  // playback ourselves and fall back to the still image if it is refused.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => setVideoError(true));
    }
  }, []);

  return (
    <section className="hero-modern" id="home">
      {/* Video Background */}
      <div className="hero-video-container">
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
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
