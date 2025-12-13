import React, { useState, useEffect } from "react";
import "./ImageCaption.css";

const ImageCaption = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [category, setCategory] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = [
    { name: "Romance", icon: "❤️" },
    { name: "Sad", icon: "😢" },
    { name: "Motivation", icon: "💪" },
    { name: "Funny", icon: "😂" },
    { name: "Attitude", icon: "😎" },
  ];

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
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

    setLoading(true);
    setCaption("");

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("category", category);

    try {
      const res = await fetch("http://127.0.0.1:8000/generate-caption", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      // Add a tiny delay for nicer UX (optional)
      setTimeout(() => {
        setCaption(data.caption || "No caption returned.");
        setLoading(false);
      }, 250);
    } catch (error) {
      console.error("Error:", error);
      alert("Error generating caption");
      setLoading(false);
    }
  };

  return (

    <div className="caption-container">
      <h2 className="stoke-text title">UPLOAD IMAGE</h2>

      <div
        className="drag-box"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {!imageFile ? (
          <>
            <div>
              <p className="drag-title">Drag & Drop</p>
              <p className="drag-sub">Upload JPG, PNG (Max 10MB)</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </>
        ) : (
          <div className="file-preview">
            {imagePreview && (
              <img src={imagePreview} alt="preview" className="preview-img" />
            )}
            <div className="file-info">
              <p className="file-name">📁 {imageFile.name}</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              title="Replace image"
            />
          </div>
        )}
      </div>

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

      <button
        className="caption-btn"
        onClick={generateCaption}
        disabled={loading}
      >
        {loading ? (
          <span className="btn-loader">
            <span className="spinner" /> Generating...
          </span>
        ) : (
          "Generate Caption"
        )}
      </button>

      
      {caption && (
        <p className={`caption-output`}>{caption}</p>
      )}
    </div>
    
  );
};

export default ImageCaption;
