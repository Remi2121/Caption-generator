import React from "react";
import { NavLink } from "react-router-dom";

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
          <li><NavLink to="/image-caption">Image Caption</NavLink></li>
          <li><NavLink to="/multi-language">Multi Language</NavLink></li>
          <li><NavLink to="/profile-caption">Profile Caption</NavLink></li>
          <li><NavLink to="/about-us">About Us</NavLink></li>
          <li><NavLink to="/eventcaption">Event Caption</NavLink></li>

        </ul>
      </nav>
    </header>
  );
};

export default Header;
