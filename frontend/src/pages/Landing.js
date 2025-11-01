import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import Technology from '../components/landing/Technology';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';
import '../landing.css';

function Landing() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Hero />
        <About />
        <Technology />
        <CTA />
      </div>
      <Footer />
    </>
  );
}

export default Landing;

