import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './components/Header';
import Hero from './components/Hero';
import WhatToExpect from './components/WhatToExpect';
import Events from './components/Events';
import MapSection from './components/MapSection';
import ContactForm from './components/ContactForm';
import Location from './components/Location';
import Footer from './components/Footer';
import './App.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 550,
      once: true,
      offset: 60,
      easing: 'ease-out-quad'
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Hero />
      <WhatToExpect />
      <Events />
      <MapSection />
      <ContactForm />
      <Location />
      <Footer />
    </div>
  );
}

export default App;
