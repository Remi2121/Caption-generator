import React, { useState } from "react";
import "./ImageCaption.css";

const ImageCaption = () => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [caption, setCaption] = useState("");

  const categories = [
    { name: "Romance", icon: "❤️" },
    { name: "Sad", icon: "😢" },
    { name: "Motivation", icon: "💪" },
    { name: "Funny", icon: "😂" },
    { name: "Attitude", icon: "😎" },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const generateCaption = () => {
    if (!image) {
      alert("Please upload an image!");
      return;
    }
    if (!category) {
      alert("Please select a category!");
      return;
    }
    setCaption(`Generated a ${category} style caption for your image!`);
  };

  return (
    <div className="caption-container">
      
      <h2 className="title">UPLOAD IMAGE</h2>

      {/* Drag & Drop upload area */}
      <div className="drag-box">
        {!image ? (
          <>
            <p className="drag-title">Drag & Drop</p>
            <p className="drag-sub">Upload JPG, PNG (Max 10MB)</p>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </>
        ) : (
          <img src={image} className="preview-img" alt="Preview" />
        )}
      </div>

      {/* Category boxes */}
      <div className="category-container">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className={`category-box ${category === cat.name ? "active" : ""}`}
            onClick={() => setCategory(cat.name)}
          >
            <div className="cat-icon">{cat.icon}</div>
            <div className="cat-name">{cat.name}</div>
          </div>
        ))}
      </div>

      {/* BUTTON ALWAYS VISIBLE */}
      <button className="caption-btn" onClick={generateCaption}>
        Generate Caption
      </button>

      {caption && <p className="caption-output">{caption}</p>}
    </div>
  );
};

export default ImageCaption;
