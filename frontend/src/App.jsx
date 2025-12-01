import React from "react";
import bg from "./assets/background.jpg";
import "./App.css";
import Home from "./Home/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageCaption from "./Components/imageCaption/ImageCaption.jsx";
import ProfileCaption from "./Components/Profilecaption/profilecap.jsx";
import MultiLan from "./Components/Multilanguage/multilan.jsx";
import AboutUs from "./Components/Aboutus/AboutUs.jsx";

const App = () => {
  return (
    <div
      className="app-background"
      style={{ backgroundImage: `url(${bg})` }}
    >
    <Router>
        <Routes>
          <Route path="/" element={<Home   />} />
          <Route path="/image-caption" element={<ImageCaption />} />
          <Route path="/profile-caption" element={<ProfileCaption />} />
          <Route path="/multi-language" element={<MultiLan />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;


