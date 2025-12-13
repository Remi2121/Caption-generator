import React, { useState } from "react";
import "./profilecap.css";


const Profilecap = () => {
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("Professional");
  const [platform, setPlatform] = useState("linkedin");
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [hashtagsCount, setHashtagsCount] = useState(5);

  const [captionData, setCaptionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateCaption = async () => {
    if (!keywords.trim()) {
      alert("Please enter your professional details or skills!");
      return;
    }
    setLoading(true);
    setCaptionData(null);

    const payload = {
      name: "User",
      role: keywords,
      skills: keywords.split(",").map((k) => k.trim()),
      tone: tone.toLowerCase(),
      include_emojis: includeEmojis,
      hashtags_count: parseInt(hashtagsCount || 0, 10),
      platform,
    };

    try {
      const res = await fetch("http://127.0.0.1:8001/generate-profile-caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setCaptionData(data?.variants?.[0] ?? null);
    } catch (err) {
      console.error("Error generating caption:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const makeCopyText = () => {
    if (!captionData) return "";
    switch (platform) {
      case "linkedin":
        return `${captionData.headline || ""}\n${captionData.tagline || ""}\n${captionData.about || ""}\n${(captionData.hashtags || []).join(" ")}`;
      case "cv":
        return `${captionData.objective || ""}\n${(captionData.summary_bullets || []).map(b => `- ${b}`).join("\n")}\nSkills: ${captionData.skills_line || ""}`;
      case "portfolio":
        return `${captionData.hero_title || ""}\n${captionData.hero_subtitle || ""}\n${captionData.about || ""}\n${captionData.cta || ""}`;
      case "instagram":
        return `${captionData.bio || ""}\n${(captionData.hashtags || []).join(" ")}`;
      default:
        return "";
    }
  };

  return (

      <div className="profilecap-container" id="profileCaption">
      <div className="profilecap-title">
        <h2 className="stoke-text">Professional Profile </h2>
        <h3>Caption Generator</h3>
      </div>
        <p className="profilecap-subtext">
          Generate captions for LinkedIn, CV/Resume, Portfolio, or Instagram.
        </p>

        <div className="profilecap-box">
          <label>Enter your professional keywords or role:</label>
          <input
            type="text"
            placeholder="e.g., UI/UX Designer, Figma, Prototyping, Design Systems"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />

          <label>Select tone:</label>
          <select value={tone} onChange={(e) => setTone(e.target.value)}>
            <option>Professional</option>
            <option>Motivational</option>
            <option>Friendly</option>
            <option>Inspirational</option>
          </select>

          <label>Choose output format:</label>
          <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
            <option value="linkedin">LinkedIn</option>
            <option value="cv">CV / Resume</option>
            <option value="portfolio">Portfolio</option>
          </select>

          <label>Include emojis?</label>
          <select
            value={String(includeEmojis)}
            onChange={(e) => setIncludeEmojis(e.target.value === "true")}
          >
            <option value="true">Yes 😊</option>
            <option value="false">No 🚫</option>
          </select>

          <label>Number of hashtags:</label>
          <input
            type="number"
            min="0"
            max="10"
            value={hashtagsCount}
            onChange={(e) => setHashtagsCount(e.target.value)}
          />

          <button onClick={generateCaption} className="profilecap-btn" disabled={loading}>
            {loading ? "Generating..." : "Generate Caption"}
          </button>

          {captionData && (
            <div className="caption-result">
              <button className="copy-btn" onClick={() => copyToClipboard(makeCopyText())}>
                Copy
              </button>

              {platform === "linkedin" && (
                <>
                  <h3>✨ Generated LinkedIn Profile</h3>
                  <p><strong>Headline:</strong> {captionData.headline}</p>
                  <p><strong>Tagline:</strong> {captionData.tagline}</p>
                  <p><strong>About:</strong> {captionData.about}</p>
                  {captionData.hashtags?.length > 0 && (
                    <p className="hashtags">
                      {captionData.hashtags.map((tag, i) => <span key={i}>{tag} </span>)}
                    </p>
                  )}
                </>
              )}

              {platform === "cv" && (
                <>
                  <h3>🧾 CV / Resume Summary</h3>
                  <p><strong>Objective:</strong> {captionData.objective}</p>
                  {captionData.summary_bullets?.length > 0 && (
                    <ul>
                      {captionData.summary_bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  )}
                  <p><strong>Skills:</strong> {captionData.skills_line}</p>
                </>
              )}

              {platform === "portfolio" && (
                <>
                  <h3>🌐 Portfolio Hero</h3>
                  <p><strong>Title:</strong> {captionData.hero_title}</p>
                  <p><strong>Subtitle:</strong> {captionData.hero_subtitle}</p>
                  <p><strong>About:</strong> {captionData.about}</p>
                  <p><strong>CTA:</strong> {captionData.cta}</p>
                </>
              )}

              
            </div>
          )}
        </div>
      </div>
    
  );
};

export default Profilecap;
