import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  # ✅ Add CORS support
from image_captioning import generate_caption
from desease_classification import describe_desease
import io

# Define frontend static and root path
frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend'))
static_dir = os.path.join(frontend_dir, 'static')

# Initialize Flask application
app = Flask(__name__, static_folder=static_dir, static_url_path='/static')
CORS(app)  # ✅ Enable CORS for all endpoints

@app.route('/api/image-caption', methods=['POST'])
def image_caption():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    image_file = request.files['image']
    image_bytes = image_file.read()

    # Step 1: Generate caption from image
    caption = generate_caption(io.BytesIO(image_bytes))

    # Step 2: Human body/skin/face detection logic
    if any(keyword in caption.lower() for keyword in ['skin', 'face', 'hand', 'leg', 'arm', 'human']):
        # Run disease description logic if image is human-related
        print("ok tested")
        disease_info = describe_desease(io.BytesIO(image_bytes))
        return jsonify({
            'caption': caption,
            'disease': disease_info
        })
    else:
        return jsonify({
            'caption': caption,
            'error': 'Invalid image. No human-related content detected.'
        }), 422

@app.route('/')
def serve_index():
    return send_from_directory(frontend_dir, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
