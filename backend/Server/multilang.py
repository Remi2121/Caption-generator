from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import base64
from transformers import BlipProcessor, BlipForConditionalGeneration
from deep_translator import GoogleTranslator

app = Flask(__name__)
CORS(app)

# Initialize the image captioning model (BLIP)
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

# Language code mapping
LANGUAGE_CODES = {
    'english': 'en',
    'sinhala': 'si',
    'tamil': 'ta',
    'spanish': 'es',
    'french': 'fr',
    'german': 'de',
    'chinese': 'zh-CN',
    'japanese': 'ja',
    'korean': 'ko',
    'arabic': 'ar'
}

def generate_caption(image, caption_type='descriptive'):
    if image.mode != 'RGB':
        image = image.convert('RGB')
    inputs = processor(image, return_tensors="pt")
    
    if caption_type == 'short':
        out = model.generate(**inputs, max_length=15, num_beams=3)
    elif caption_type == 'detailed':
        out = model.generate(**inputs, max_length=100, num_beams=5)
    elif caption_type == 'creative':
        out = model.generate(**inputs, max_length=50, num_beams=5)
    elif caption_type == 'technical':
        inputs = processor(image, "a technical description of", return_tensors="pt")
        out = model.generate(**inputs, max_length=60, num_beams=4)
    else:
        out = model.generate(**inputs, max_length=50, num_beams=4)
    
    return processor.decode(out[0], skip_special_tokens=True)

def translate_caption(caption, target_language):
    if target_language == 'english':
        return caption
    try:
        lang_code = LANGUAGE_CODES.get(target_language, 'en')
        return GoogleTranslator(source='auto', target=lang_code).translate(caption)
    except Exception as e:
        print(f"Translation error: {e}")
        return caption

@app.route('/generate-caption', methods=['POST'])
def generate_caption_endpoint():
    try:
        data = request.get_json()
        image_data = data.get('image')
        if not image_data:
            return jsonify({'error': 'No image provided'}), 400
        if ',' in image_data:
            image_data = image_data.split(',')[1]
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes))

        language = data.get('language', 'english')
        caption_type = data.get('captionType', 'descriptive')

        caption = generate_caption(image, caption_type)
        translated_caption = translate_caption(caption, language)

        return jsonify({
            'caption': translated_caption,
            'original_caption': caption if language != 'english' else None,
            'language': language,
            'caption_type': caption_type
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
