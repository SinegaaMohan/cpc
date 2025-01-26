from google.cloud import storage
import tensorflow as tf
from PIL import Image
import numpy as np
from io import BytesIO
import os

# Global variables
MODEL = None
BUCKET_NAME = "tf-model-sliit-project"  # GCP bucket name
CLASS_NAMES = ['Pepper__bell___Bacterial_spot', 'Pepper__bell___healthy']

def download_blob(bucket_name, source_blob_name, destination_file_name):
    """Downloads a blob from the bucket."""
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(destination_file_name)
    print(f"Blob {source_blob_name} downloaded to {destination_file_name}.")


def download_model():
    global MODEL
    if MODEL is None:
        print("Loading the model...")
        download_blob(
            BUCKET_NAME,
            "models/1.keras",
            "/tmp/1.keras",
        )
        MODEL = tf.keras.models.load_model("/tmp/1.keras")
        print("Model loaded successfully.")

def read_file_as_image(data) -> np.ndarray:
    """Reads the image file and converts it to a numpy array."""
    image = np.array(Image.open(BytesIO(data)))
    return image

def predict(request):
    """HTTP Cloud Function to classify an image uploaded as a file."""
    # Set CORS headers
    headers = {
        "Access-Control-Allow-Origin": "*",  # Allow requests from any origin
        "Access-Control-Allow-Methods": "POST, OPTIONS",  # Allow POST and OPTIONS methods
        "Access-Control-Allow-Headers": "Content-Type",  # Allow Content-Type header
    }

    # If the request method is OPTIONS, return a successful response
    if request.method == "OPTIONS":
        return "", 204, headers

    download_model()  # Ensure the model is downloaded and loaded

    try:
        # Ensure the request contains the 'file' field
        if 'file' not in request.files:
            print("No file provided in the request.")
            return {"error": "No file provided"}, 400

        # Get the image file from the request
        image_file = request.files["file"]
        print("Image file received.")

        # Read the image using the helper function
        image = read_file_as_image(image_file.read())
        image_batch = np.expand_dims(image, 0)  # Expand dimensions for prediction
        print("Image processed and batch prepared for prediction.")

        # Make predictions
        predictions = MODEL.predict(image_batch)
        predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
        accuracy = np.max(predictions[0])

        print(f"Predicted class: {predicted_class}, Accuracy: {accuracy:.2f}")
        return {"class": predicted_class, "accuracy": float(accuracy)}, 200

    except Exception as e:
        print(f"Error processing the request: {e}")
        return {"error": str(e)}, 500
