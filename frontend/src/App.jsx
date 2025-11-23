import React from "react";
import bg from "./assets/background.jpg";
import "./App.css";
import Home from "./Home/Home";

const App = () => {
  return (
    <div
      className="app-background"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Home />
    </div>
  );
};

export default App;
