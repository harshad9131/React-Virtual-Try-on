import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-title"><i className="fas fa-magic"></i> Virtual Try-On</div>
        <Link to="/tryon" className="nav-button">
          <i className="fas fa-rocket"></i> Try-On Now
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

