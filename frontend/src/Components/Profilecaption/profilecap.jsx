import React, { useState } from "react";
import "./profilecap.css";

const Profilecap = () => {
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("Professional");
  const [caption, setCaption] = useState("");

  const generateCaption = () => {
    if (!keywords.trim()) {
      alert("Please enter your keywords or a short description!");
      return;
    }

    // In real use, connect to AI backend here
    setCaption(
      `🚀 ${tone} LinkedIn Caption: "Passionate about ${keywords}, driven to create meaningful impact through innovation and collaboration."`
    );
  };

  return (
    <div className="profilecap-container" id="profileCaption">
      <h2 className="profilecap-title">Professional Profile Caption Generator</h2>
      <p className="profilecap-subtext">
        Generate perfect captions for your LinkedIn, portfolio, or bio sections
        — highlight your skills and personal brand.
      </p>

      <div className="profilecap-box">
        <label>Enter your professional keywords or interests:</label>
        <input
          type="text"
          placeholder="e.g., Web Developer, AI Enthusiast, Designer"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />

        <label>Select tone:</label>
        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option>Professional</option>
          <option>Motivational</option>
          <option>Friendly</option>
          <option>Inspirational</option>
        </select>

        <button onClick={generateCaption} className="profilecap-btn">
          Generate Caption
        </button>

        {caption && (
          <div className="caption-result">
            <p>{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profilecap;
