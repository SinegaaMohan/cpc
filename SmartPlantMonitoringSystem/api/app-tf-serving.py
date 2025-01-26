from fastapi import FastAPI, File, UploadFile
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import requests

app = FastAPI()

endpoint = "http://localhost:8605/v1/models/Bell_Pepper_Model:predict"

#MODEL = tf.keras.models.load_model("/home/punky/ml/tf_gpu/models/1.keras")

CLASS_NAMES = ['Pepper__bell___Bacterial_spot', 'Pepper__bell___healthy']


@app.get("/hello")
async def hello():
    return "welcome"

def read_files_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = read_files_as_image(await file.read())
    image_batch = np.expand_dims(image, 0)

    json_data = {
        "instances": image_batch.tolist()
    }

    response = requests.post(endpoint, json=json_data)
    prediction = np.array(response.json()["predictions"][0])

    predicted_class = CLASS_NAMES[np.argmax(prediction)]
    confidence = np.max(prediction)

    return {
        'class' : predicted_class,
        'accuracy': confidence
    }

if __name__=="__main__":
    uvicorn.run(app,host='localhost', port=8000)