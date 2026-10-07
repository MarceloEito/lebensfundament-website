import React from 'react';
import './Location.css';

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.1em', height: '1.1em', verticalAlign: 'middle', marginRight: '0.4em', display: 'inline-block' }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

function Location() {
  return (
    <div className="location-banner">
      <div className="location-content">
        <h3><MapPinIcon />Eichenhübel 14, 66892 Bruchmühlbach-Miesau</h3>
      </div>
    </div>
  );
}

export default Location;
