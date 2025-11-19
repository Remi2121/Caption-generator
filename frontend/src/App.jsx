import React from "react";
import Header from "./Components/Header/header";
<<<<<<< HEAD
import ImageCaption from "./Components/ImageCaption";
import bg from "./assets/background.jpg";

const App = () => {
  return (
    <div className="app-background"
  style={{
  backgroundImage: `url(${bg})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  minHeight: "100vh",
}}
>
     
      <ImageCaption />
=======
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
>>>>>>> 78d41b09c8cf505951c9682e98069c7ace22f97e
    </div>
  );
};

export default App;
