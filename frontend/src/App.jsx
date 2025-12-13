// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import bg from "./assets/background.jpg";
import "./App.css";

import Home from "./Home/Home";
import ImageCaption from "./Components/imageCaption/ImageCaption.jsx";
import ProfileCaption from "./Components/Profilecaption/profilecap.jsx";
import MultiLan from "./Components/Multilanguage/multilan.jsx";
import AboutUs from "./Components/Aboutus/AboutUs.jsx";
import Event from "./Components/Event/EventCaption.jsx";
import Header from "./Components/Header/header.jsx";
import Footer from "./Components/Fodder/Fodder.jsx";


const App = () => {


  return (
    <Router>
      <div
        className="app-background"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Header  />


        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/image-caption" element={<ImageCaption />} />
            <Route path="/profile-caption" element={<ProfileCaption />} />
            <Route path="/multi-language" element={<MultiLan />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/eventcaption" element={<Event />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
