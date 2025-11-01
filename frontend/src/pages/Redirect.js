import React from 'react';
import { Link } from 'react-router-dom';

function Redirect() {
  return (
    <div className="redirect-container">
      <div className="redirect-content">
        <div className="redirect-icon">👋</div>
        <p className="redirect-message">
          You are leaving the landing page. Click below to return to the main Virtual Try-On app.
        </p>
        <Link to="/tryon" className="redirect-button">
          <i className="fas fa-arrow-left"></i> Back to Main App
        </Link>
      </div>
    </div>
  );
}

export default Redirect;

