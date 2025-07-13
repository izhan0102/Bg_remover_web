from flask import Flask, request, jsonify, send_file, send_from_directory
import os
import io
import uuid
import rembg
from PIL import Image
from flask_cors import CORS

app = Flask(__name__, static_folder='.', template_folder='.')
CORS(app)  # Enable CORS for all routes

# Create temp directory if it doesn't exist
TEMP_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'temp')
os.makedirs(TEMP_DIR, exist_ok=True)

# Serve main HTML pages
@app.route('/')
def index():
    return send_file('index.html')

@app.route('/remove-bg.html')
def remove_bg():
    return send_file('remove-bg.html')

@app.route('/privacy-policy.html')
def privacy_policy():
    return send_file('privacy-policy.html')

@app.route('/terms-of-service.html')
def terms_of_service():
    return send_file('terms-of-service.html')

# Handle background removal API endpoint
@app.route('/api/remove-background', methods=['POST'])
def remove_background():
    try:
        # Check if the post request has the file part
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        
        # If user does not select file, browser also
        # submits an empty part without filename
        if file.filename == '':
            return jsonify({'error': 'No image selected'}), 400
        
        # Generate unique filename to avoid collisions
        unique_id = str(uuid.uuid4())
        input_path = os.path.join(TEMP_DIR, f"{unique_id}_input.png")
        output_path = os.path.join(TEMP_DIR, f"{unique_id}_output.png")
        
        # Save original image
        img = Image.open(file.stream)
        img.save(input_path)
        
        # Process the image with rembg
        with open(input_path, "rb") as input_file:
            input_data = input_file.read()
            
        # Remove background
        output_data = rembg.remove(input_data)
        
        # Save processed image
        with open(output_path, "wb") as output_file:
            output_file.write(output_data)
        
        # Return the processed image
        return send_file(output_path, mimetype='image/png')
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    finally:
        # Clean up temporary files
        try:
            if os.path.exists(input_path):
                os.remove(input_path)
            if os.path.exists(output_path):
                os.remove(output_path)
        except:
            pass

# Serve static files (CSS, JS, images, etc.)
@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    print(f"Server running at http://127.0.0.1:{port}/")
    print("Press Ctrl+C to stop the server")
    app.run(debug=True, host='0.0.0.0', port=port) 