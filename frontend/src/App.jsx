import React from "react";
import Header from "./Components/Header/header";
import ImageCaption from "./Components/ImageCaption";
import './App.css';
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
    </div>
  );
};

export default App;
