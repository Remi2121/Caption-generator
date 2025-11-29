import React from "react";
import "./header.css";
import logo from "../../assets/logo.png";
import Profilecap from "../Profilecaption/profilecap";

const Header = () => {
  return (
    <header className="header-container">
      {/* Left side logo */}
      <div className="logo-section">
        <img src={logo} alt="CaptionGen Logo" className="logo-img" />
        <h1 className="logo-text">
          Caption<span>Gen</span>
        </h1>
      </div>

      {/* Center Nav */}
      <nav className="navbar">
        <ul>
          <li>
            <a href="/image-caption" target="_blank" rel="noopener noreferrer">
              Image Caption
            </a>
          </li>
          <li>
            <a href="/multi-language" target="_blank" rel="noopener noreferrer">
              Multi Language
            </a>
          </li>
          <li>
            <a href="/profile-caption" target="_blank" rel="noopener noreferrer">
              Profile Caption
            </a>
          </li>
          <li>
            <a href="/about-us" target="_blank" rel="noopener noreferrer">
              About Us
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
