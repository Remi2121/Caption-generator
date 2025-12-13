import React, { useState } from 'react';
import './multilan.css';

const Multilan = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [language, setLanguage] = useState('english');
  const [captionType, setCaptionType] = useState('descriptive');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const languages = [
    { value: 'english', label: 'English', flag: '🇬🇧' },
    { value: 'sinhala', label: 'Sinhala', flag: '🇱🇰' },
    { value: 'tamil', label: 'Tamil', flag: '🇱🇰' },
    { value: 'spanish', label: 'Spanish', flag: '🇪🇸' },
    { value: 'french', label: 'French', flag: '🇫🇷' },
    { value: 'german', label: 'German', flag: '🇩🇪' },
    { value: 'chinese', label: 'Chinese', flag: '🇨🇳' },
    { value: 'japanese', label: 'Japanese', flag: '🇯🇵' },
    { value: 'korean', label: 'Korean', flag: '🇰🇷' },
    { value: 'arabic', label: 'Arabic', flag: '🇸🇦' },
  ];

  const captionTypes = [
    { value: 'descriptive', label: 'Descriptive', icon: '📝' },
    { value: 'short', label: 'Short & Concise', icon: '⚡' },
    { value: 'detailed', label: 'Detailed Analysis', icon: '🔍' },
    { value: 'creative', label: 'Creative', icon: '🎨' },
    { value: 'technical', label: 'Technical', icon: '⚙️' },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setCaption('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const event = { target: { files: [file] } };
      handleImageUpload(event);
    }
  };

  const handleGenerateCaption = async () => {
    if (!image) {
      alert('Please upload an image first!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/generate-caption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imagePreview, // base64 string
          language: language,
          captionType: captionType
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Backend error');
      }

      const data = await response.json();
      setCaption(data.caption);
    } catch (error) {
      alert('Error generating caption: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = () => {
    setImage(null);
    setImagePreview(null);
    setCaption('');
    setLanguage('english');
    setCaptionType('descriptive');
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(caption);
    alert('Caption copied to clipboard!');
  };

  return (
    <div className="multilan-wrapper">
      <div className="multilan-container">
        {/* Header */}
        <div className="header-section">
          <h1 className="main-title">🌍 Multi-Language Caption Generator</h1>
          <p className="subtitle">
            Generate image captions in multiple languages with ease. Upload an image and select your desired language to receive accurate and context-aware captions.
          </p>
        </div>

        {/* Main Content */}
        <div className={`content-grid ${imagePreview ? 'has-image' : ''}`}>
          {/* Upload Section */}
          <div className="upload-section">
            <div
              className={`upload-box ${imagePreview ? 'has-preview' : ''}`}
              onClick={() => document.getElementById('imageUpload').click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {!imagePreview ? (
                <div className="upload-placeholder">
                  <div className="upload-icon">📸</div>
                  <h3 className="upload-title">Upload Your Image</h3>
                  <p className="upload-text">Click to browse or drag and drop</p>
                  <p className="upload-formats">Supports: JPG, PNG, WebP</p>
                </div>
              ) : (
                <img src={imagePreview} alt="Preview" className="preview-image" />
              )}
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />
            </div>
          </div>

          {/* Options Section */}
          <div className="options-section">
            {/* Language Selection */}
            <div className="option-group">
              <label className="option-label">🗣️ Select Language</label>
              <div className="language-grid">
                {languages.map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() => setLanguage(lang.value)}
                    className={`lang-button ${language === lang.value ? 'active' : ''}`}
                  >
                    <div className="lang-flag">{lang.flag}</div>
                    <div className="lang-label">{lang.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Caption Type Selection */}
            <div className="option-group">
              <label className="option-label">✨ Caption Style</label>
              <div className="caption-type-grid">
                {captionTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setCaptionType(type.value)}
                    className={`type-button ${captionType === type.value ? 'active' : ''}`}
                  >
                    <div className="type-icon">{type.icon}</div>
                    <div className="type-label">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                onClick={handleGenerateCaption}
                disabled={!image || loading}
                className="generate-button"
              >
                {loading ? '⏳ Generating...' : '🚀 Generate Caption'}
              </button>

              {(image || caption) && (
                <button onClick={handleClearAll} className="clear-button">
                  🗑️ Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Caption Result */}
        {caption && (
          <div className="caption-result">
            <div className="result-header">
              <h3 className="result-title">📋 Generated Caption</h3>
              <button onClick={handleCopyCaption} className="copy-button">
                📋 Copy
              </button>
            </div>
            <p className="caption-text">{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Multilan;
