from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from dotenv import load_dotenv
from PIL import Image
from io import BytesIO
import os

# Load .env
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise SystemExit("Set GEMINI_API_KEY in .env")

client = genai.Client(api_key=API_KEY)
MODEL = "models/gemini-2.5-flash"

app = Flask(__name__)
CORS(app)   # Allow all origins

@app.route("/generate-caption", methods=["POST"])
def generate_caption():
    # Check file
    if "image" not in request.files:
        return jsonify({"error": "No image provided"}), 400

    image_file = request.files["image"]
    category = request.form.get("category", "")

    # Read image using PIL
    img_bytes = image_file.read()
    img = Image.open(BytesIO(img_bytes))

    prompt = f"Write a {category} style stylish caption (<= 80 chars) with simple English and emoji."

    # Gemini API Call
    res = client.models.generate_content(
        model=MODEL,
        contents=[prompt, img]
    )

    caption = res.text.strip()

    return jsonify({"caption": caption})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
