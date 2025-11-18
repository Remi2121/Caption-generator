import React from "react";
import Header from "./Components/Header/header";
import ImageCaption from "./Components/ImageCaption/ImageCaption";
import bg from "./assets/background.jpg";
import "./App.css"; // make sure this imports the CSS below

const App = () => {
  return (
    <div
      className="app-background"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Header />
      <div className="center-area">
        <ImageCaption />
      </div>
    </div>
  );
};

export default App;
