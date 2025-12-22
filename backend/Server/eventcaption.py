from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from dotenv import load_dotenv
import os

# -----------------------------
# Load .env
# -----------------------------
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise SystemExit("❌ Set GEMINI_API_KEY in .env")

# -----------------------------
# Gemini setup
# -----------------------------
client = genai.Client(api_key=API_KEY)
MODEL = "models/gemini-2.5-flash"

# -----------------------------
# Flask app
# -----------------------------
app = Flask(__name__)
CORS(app)

# -----------------------------
# Event Caption API
# -----------------------------
@app.route("/event-caption", methods=["POST"])
def event_caption():
    data = request.json

    event = data.get("event", "")
    language = data.get("language", "English")

    if not event:
        return jsonify({"error": "Event is required"}), 400

    # Prompt for Gemini
    prompt = f"""
Write a short, stylish {event} caption in {language}.
Rules:
- Max 4 lines
- Simple and emotional
- Add suitable emojis
- Friendly tone
"""

    try:
        res = client.models.generate_content(
            model=MODEL,
            contents=prompt
        )

        caption = res.text.strip()
        return jsonify({"caption": caption})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -----------------------------
# Run server
# -----------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
