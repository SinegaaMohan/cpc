from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import io

app = Flask(__name__)

# Load the model
model_path = '/home/punky/ml/tf_gpu/Deep_Learning_Models/Pepper Bell Classification Model.keras'
model = load_model(model_path)

def preprocess_image(image):
    image = image.resize((224, 224))  # Resize as required by your model
    image_array = np.array(image)
    image_array = image_array / 255.0  # Normalize if required
    return np.expand_dims(image_array, axis=0)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Ensure the file is an image
    if file.content_type not in ['image/jpeg', 'image/png']:
        return jsonify({'error': 'Unsupported file type'}), 400

    try:
        image = Image.open(file.stream)
        image = preprocess_image(image)
        predictions = model.predict(image)
    except Exception as e:
        return jsonify({'error': f'Image processing error: {str(e)}'}), 400

    # Handle predictions
    print("Predictions:", predictions)  # Debugging line
    if predictions.size > 0:
        label = "Healthy" if predictions[0] > 0.5 else "Not Healthy"
    else:
        label = "No prediction available"

    return jsonify({'label': label})


if __name__ == '__main__':
    app.run(debug=True)
