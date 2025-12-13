import React, { useState } from "react";
import "./EventCaption.css";
import Header from "../Header/header";

const EventCaption = () => {
  const [event, setEvent] = useState("New Year");
  const [caption, setCaption] = useState("");

  const generateCaption = () => {
    setCaption(`🎉 Happy ${event}! Wishing you joy and success!`);
  };

  return (
   <>
    <Header />
    <div className="event-wrapper">
      <h1 className="event-title">🎉 Event-Based Captions</h1>

      {/* EVENT SELECT */}
      <label className="label">Select Event</label>
      <select
        className="dropdown"
        value={event}
        onChange={(e) => setEvent(e.target.value)}
      >
       <option value="New Year">🎉 New Year</option>
  <option value="Christmas">🎄 Christmas</option>
  <option value="Birthday">🎂 Birthday</option>
  <option value="Wedding">💍 Wedding</option>
  <option value="Graduation">🎓 Graduation</option>
      </select>

      {/* BUTTON */}
      <button className="event-btn" onClick={generateCaption}>
        ✨ Generate Caption
      </button>

      {/* MESSAGE BOX */}
      <label className="label">Event Message</label>
      <div className="event-output">
        {caption ? caption : "🎯 Your event caption will appear here..."}
      </div>
    </div>
    </>
    
  );
};

export default EventCaption;
