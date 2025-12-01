import React from "react";
import "./Home.css";
import Header from "../Components/Header/header";
import ImageCaption from "../Components/imageCaption/ImageCaption";

const Home = () => {
  return (
      <main className="page-content">
        <div id="imageCaption">
          <ImageCaption />
        </div>
      </main>
  );
};

export default Home;
