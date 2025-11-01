import React from 'react';

function Hero() {
  return (
    <section className="hero-section">
      <h1 className="hero-heading">👗 Virtual Try-On: Experience the Future of Fashion</h1>
      <p className="hero-subheading">
        An AI-powered platform that lets you preview outfits virtually before buying — try it on yourself and see the results in seconds.
      </p>
      <div className="hero-features">
        <div className="hero-feature-item">
          <i className="fas fa-magic"></i>
          <span>AI-Powered</span>
        </div>
        <div className="hero-feature-item">
          <i className="fas fa-bolt"></i>
          <span>Instant Results</span>
        </div>
        <div className="hero-feature-item">
          <i className="fas fa-star"></i>
          <span>High Quality</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;

