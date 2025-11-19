import React, { useState } from "react";
import "./ImageCaption.css";

const ImageCaption = () => {
  const [imageFile, setImageFile] = useState(null);
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
    if (file) {
      setImageFile(file); // store file object
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file && file.type.startsWith("image")) {
      setImageFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

const generateCaption = async () => {
  if (!imageFile) {
    alert("Please upload an image!");
    return;
  }
  if (!category) {
    alert("Please select a category!");
    return;
  }

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("category", category);

  try {
    const res = await fetch("http://localhost:8000/generate-caption", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setCaption(data.caption);

  } catch (error) {
    console.error("Error:", error);
    alert("Error generating caption");
  }
};


  return (
    <div className="caption-container">
      <h2 className="title">UPLOAD IMAGE</h2>

      {/* Drag & Drop upload area */}
      <div className="drag-box" onDrop={handleDrop} onDragOver={handleDragOver}>
        {!imageFile ? (
          <>
            <p className="drag-title">Drag & Drop</p>
            <p className="drag-sub">Upload JPG, PNG (Max 10MB)</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </>
        ) : (
          <div className="file-info">
            <p className="file-name">📁 {imageFile.name}</p>
          </div>
        )}
      </div>

      {/* Category boxes */}
      <div className="category-container">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className={`category-box ${
              category === cat.name ? "active" : ""
            }`}
            onClick={() => setCategory(cat.name)}
          >
            <div className="cat-icon">{cat.icon}</div>
            <div className="cat-name">{cat.name}</div>
          </div>
        ))}
      </div>

      {/* Button */}
      <button className="caption-btn" onClick={generateCaption}>
        Generate Caption
      </button>

      {caption && <p className="caption-output">{caption}</p>}
    </div>
  );
};

export default ImageCaption;
