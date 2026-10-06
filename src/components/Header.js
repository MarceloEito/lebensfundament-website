import React, { useState, useEffect } from 'react';
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`modern-header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-container">
          <div className="logo">
            <img src="/logo.jpeg" alt="Lebensfundament Logo" className="logo-image" />
            <h1>LEBENSFUNDAMENT</h1>
          </div>

          <button
            className="hamburger-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
          </button>

          <nav className={`main-nav ${menuOpen ? 'active' : ''}`}>
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>Über uns</a>
            <a href="#events" onClick={() => setMenuOpen(false)}>Veranstaltungen</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Kontakt</a>
          </nav>
        </div>
      </header>

      {menuOpen && (
        <div
          className="overlay"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Header;
