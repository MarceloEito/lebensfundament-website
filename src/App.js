import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServiceTimes from './components/ServiceTimes';
import WhatToExpect from './components/WhatToExpect';
import MapSection from './components/MapSection';
import ContactForm from './components/ContactForm';
import Location from './components/Location';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <ServiceTimes />
      <WhatToExpect />
      <MapSection />
      <ContactForm />
      <Location />
      <Footer />
    </div>
  );
}

export default App;
