import React, { useState } from "react";
import "./ImageCaption.css";

const ImageCaption = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const generateCaption = () => {
    alert("Caption generation logic here!");
  };

  return (
    <div className="caption-container">
      <h2 className="title">Image Caption Generator</h2>

      <label className="upload-label">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        Upload Image
      </label>

      {image && (
        <div className="preview-box">
          <img src={image} alt="Preview" className="preview-img" />
        </div>
      )}

      {image && (
        <button className="caption-btn" onClick={generateCaption}>
          Generate Caption
        </button>
      )}
    </div>
  );
};

export default ImageCaption;
