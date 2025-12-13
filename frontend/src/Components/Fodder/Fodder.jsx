import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">

        {/* === Left: Logo Section === */}
        <div className="footer-logo">
          <img src={logo} alt="CaptionGen Logo" className="footer-logo-img" />
          <h2 className="footer-logo-text">
            Caption<span>Gen</span>
          </h2>
        </div>

        {/* === Center: Quick Links === */}
        <ul className="footer-links">
          <li><Link to="/image-caption">Image Caption</Link></li>
          <li><Link to="/multi-language">Multi Language</Link></li>
          <li><Link to="/profile-caption">Profile Caption</Link></li>
          <li><Link to="/eventcaption">Event Caption</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
        </ul>

        {/* === Right: Copyright === */}
        <p className="footer-copy">
          © {new Date().getFullYear()} CaptionGen. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
