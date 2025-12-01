import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo-section">
        <img src={logo} alt="CaptionGen Logo" className="logo-img" />
        <h1 className="logo-text">
          Caption<span>Gen</span>
        </h1>
      </div>

      <nav className="navbar">
        <ul>
          <li><Link to="/image-caption">Image Caption</Link></li>
          <li><Link to="/multi-language">Multi Language</Link></li>
          <li><Link to="/profile-caption">Profile Caption</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
