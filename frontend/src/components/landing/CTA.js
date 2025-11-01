import React from 'react';
import { Link } from 'react-router-dom';

function CTA() {
  return (
    <section className="cta-section">
      <Link to="/tryon" className="cta-button">
        <i className="fas fa-magic"></i> Go to Virtual Try-On App
      </Link>
    </section>
  );
}

export default CTA;

