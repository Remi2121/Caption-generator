from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from dotenv import load_dotenv
import os, json

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise SystemExit("Set GEMINI_API_KEY in .env")

client = genai.Client(api_key=API_KEY)
MODEL = "models/gemini-2.5-flash"

app = Flask(__name__)
CORS(app)

def bool_to_text(flag: bool) -> str:
    return "yes" if flag else "no"

def build_prompt(payload: dict) -> str:
    name = payload.get("name", "")
    role = payload.get("role", "")
    industry = payload.get("industry", "")
    years = payload.get("years_experience", "")
    skills = payload.get("skills", []) or []
    achievements = payload.get("achievements", []) or []
    target_roles = payload.get("target_roles", []) or []
    location = payload.get("location", "")
    tone = payload.get("tone", "professional, warm")
    langs = payload.get("languages", ["English"])
    platform = (payload.get("platform", "linkedin") or "linkedin").lower()
    include_emojis = bool(payload.get("include_emojis", platform != "cv"))
    hashtags_count = int(payload.get("hashtags_count", 5))

    skills_str = ", ".join(skills[:15])
    ach_str = "; ".join(achievements[:6])
    targets_str = ", ".join(target_roles[:5])
    headline_limit = 220
    about_limit = 600
    tagline_limit = 80
    insta_bio_limit = 150
    goal = "job-application" if platform == "cv" else "job-search"

    if platform == "cv":
        emoji_rule = "Do not use any emojis."
        hashtag_rule = "Do not add any hashtags."
        schema = """{{
  "variants": [
    {{
      "objective": "1–2 lines, concise objective, no emojis.",
      "summary_bullets": ["impact bullet 1", "impact bullet 2", "impact bullet 3"],
      "skills_line": "Top 6–10 skills as a comma-separated line"
    }}
  ]
}}"""
        guidelines = f"""
- Target: CV/Resume summary section. No emojis. No hashtags.
- Use action-first verbs; quantify impact when possible.
- 3 bullets max in "summary_bullets".
- Keep objective specific to {role or "the role"}/{industry or "industry"}.
"""
    elif platform == "portfolio":
        emoji_rule = "Use at most 1 emoji if it fits."
        hashtag_rule = "Do not add hashtags."
        schema = f"""{{{{  
  "variants": [
    {{{{
      "hero_title": "Short, bold value prop (<= 70 chars)",
      "hero_subtitle": "1 sentence credibility + niche (<= 120 chars)",
      "about": "3–4 lines max about craft & impact (<= {about_limit} chars)",
      "cta": "Clear call to action (e.g., View Work →, Hire Me, Contact)"
    }}}}
  ]
}}}}"""
        guidelines = """
- Portfolio hero copy: crisp, client-friendly, minimal fluff.
"""
    elif platform == "instagram":
        emoji_rule = "Use 3–5 fitting emojis to add personality."
        hashtag_rule = f"Add {min(hashtags_count, 8)} short, relevant hashtags."
        schema = f"""{{{{  
  "variants": [
    {{{{
      "bio": "Instagram bio <= {insta_bio_limit} chars; line breaks allowed",
      "hashtags": ["#", "#", "#", "#", "#"]
    }}}}
  ]
}}}}"""
        guidelines = """
- Keep bio punchy, 2–3 fragments max, line-break friendly.
"""
    else:
        emoji_rule = "Use tasteful emojis sparingly (0–2 total) and only if they fit." if include_emojis else "Do not use emojis."
        hashtag_rule = f"Add {hashtags_count} short, relevant hashtags (no spaces)."
        schema = f"""{{{{  
  "variants": [
    {{{{
      "headline": "... <= {headline_limit} chars",
      "tagline": "... <= {tagline_limit} chars",
      "about": "... <= {about_limit} chars, 2–4 short lines, scannable",
      "hashtags": ["#", "#", "#", "#", "#"]
    }}}}
  ]
}}}}"""
        guidelines = f"""
- Headline: role + value + niche keywords. <= {headline_limit} chars.
- Tagline: 1 punchy sentence (<= {tagline_limit} chars) aligned to the goal.
- About: 2–4 compact lines; end with a light CTA. {hashtag_rule}
"""

    prompt = f"""
You are a career-branding assistant. Create {platform}-ready text for a human professional.

Context:
- Name: {name}
- Current/Primary Role: {role}
- Industry: {industry}
- Years of Experience: {years}
- Skills (top): {skills_str}
- Key Achievements: {ach_str}
- Target roles / interests: {targets_str}
- Location: {location}
- Languages: {", ".join(langs)}
- Goal: {goal}
- Desired tone: {tone}
- Emojis: {"allowed" if include_emojis else "not allowed"}

Output EXACTLY the following JSON schema (no extra prose):
{schema}

Style rules:
- {emoji_rule}
- {hashtag_rule}
- No placeholders. No markdown. Escape internal quotes if needed.
{guidelines}
"""
    return prompt

def safe_json(text: str):
    try:
        return json.loads(text)
    except Exception:
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1 and end > start:
            try:
                return json.loads(text[start:end+1])
            except Exception:
                pass
    return None

@app.route("/generate-profile-caption", methods=["POST"])
def generate_profile_caption():
    try:
        payload = request.get_json(force=True, silent=False) or {}
    except Exception:
        return jsonify({"error": "Invalid JSON body"}), 400
    prompt = build_prompt(payload).replace(
        '"variants": [',
        '"variants": [\n{}'
    )
    res = client.models.generate_content(model=MODEL, contents=[prompt])
    text = (getattr(res, "text", "") or "").strip()
    data = safe_json(text)
    if not data or "variants" not in data:
        return jsonify({
            "variants": [{
                "headline": "",
                "tagline": "",
                "about": text[:600],
                "hashtags": []
            }],
            "raw": text
        }), 200
    return jsonify(data), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8001, debug=True)
