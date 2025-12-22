import React, { useState } from "react";
import "./EventCaption.css";

const EventCaption = () => {
  const [event, setEvent] = useState("New Year");
  const [language, setLanguage] = useState("English");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const events = ["New Year", "Christmas", "Birthday", "Wedding", "Graduation"];
  const languages = ["English", "Tamil", "Sinhala", "Hindi", "Malayalam"];

  const generateCaption = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/event-caption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event, language }),
      });

      const data = await res.json();
      setCaption(data.caption);
    } catch (err) {
      console.error("Error:", err);
      setCaption("❌ Failed to generate caption");
    }

    setLoading(false);
  };

  return (
    <div className="event-wrapper">
      <h1 className="event-title">🎉 Event-Based Captions</h1>

      {/* Event Selection */}
      <label className="label">Select Event</label>
      <select
        className="dropdown"
        value={event}
        onChange={(e) => setEvent(e.target.value)}
      >
        {events.map((ev) => (
          <option key={ev} value={ev}>{ev}</option>
        ))}
      </select>

      {/* Language Selection */}
      <label className="label">Select Language</label>
      <select
        className="dropdown"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>

      {/* Generate Button */}
      <button
        className="event-btn"
        onClick={generateCaption}
        disabled={loading}
      >
        {loading ? "Generating..." : "✨ Generate Caption"}
      </button>

      {/* Output */}
      <label className="label">Event Message</label>
      <div className="event-output">
        {caption || "🎯 Your event caption will appear here..."}
      </div>
    </div>
  );
};

export default EventCaption;