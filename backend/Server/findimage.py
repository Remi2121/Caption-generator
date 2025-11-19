<<<<<<< HEAD
# findimage_new_multimodal.py
from google import genai
import requests
from io import BytesIO
from PIL import Image
from dotenv import load_dotenv
import os

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise SystemExit("Set GEMINI_API_KEY in .env")

# init client (new style)
client = genai.Client(api_key=API_KEY)

MODEL = "models/gemini-2.5-flash"   

image_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXo_z6SOCcLIxCM4BaKxyf6MdKCXrbxNZSu8aJlLlK_V0qmiMgpdLha7t9bw-nRn2vuF6PrrKQFyrw1Fgx4AkdzG_NZVCFq7XD0iMiN8g&s=10"

# download image and create a PIL.Image (the SDK accepts a PIL Image object)
resp = requests.get(image_url, timeout=15)
resp.raise_for_status()
img = Image.open(BytesIO(resp.content))

# contents: text prompt then the image object
response = client.models.generate_content(
    model=MODEL,
    contents=[
        "Write a short stylish social-media caption (<= 80 chars) with simple english and emoji for this image:",
        img
    ],
)

print("=== Caption ===")
print(response.text.strip())
=======
from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from dotenv import load_dotenv
from PIL import Image
from io import BytesIO
import os

# Load environment variables
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise SystemExit("Set GEMINI_API_KEY in .env")

client = genai.Client(api_key=API_KEY)
MODEL = "models/gemini-2.5-flash"

app = FastAPI()

# Allow Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate-caption")
async def generate_caption(image: UploadFile, category: str = Form(...)):
    # Read image into PIL
    img_bytes = await image.read()
    img = Image.open(BytesIO(img_bytes))

    prompt = f"Write a {category} style stylish caption (<= 80 chars) with simple English and emoji."

    # Call Gemini API
    res = client.models.generate_content(
        model=MODEL,
        contents=[prompt, img]
    )

    caption = res.text.strip()

    return {"caption": caption}
>>>>>>> 7f60c14 (change in server part)
