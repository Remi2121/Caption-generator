import React from 'react';
import Header from './Components/Header/header';
import ImageCaption from "./Components/imageCaption/ImageCaption";
import bg from "./assets/background.jpg";
import "./App.css";
import Home from "../src/Home/Home"

const App = () => {
  return (
    <div
        className="app-background"
        style={{ backgroundImage: `url(${bg})` }}
      >
      <Home/>
      </div>
    
  );
};

export default App;
