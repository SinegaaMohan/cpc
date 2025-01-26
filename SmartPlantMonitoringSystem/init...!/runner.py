
# Purpose:
# This code defines a simple Convolutional Neural Network (CNN) model for binary image
# classification tasks and checks if TensorFlow is utilizing the GPU for training.
# It includes logging to verify device placement, and uses a dummy dataset to test
# the model training process. This is a starting point for building and testing
# image classification models in a larger machine learning project, ensuring the system
# is ready to handle model creation and training efficiently.

import tensorflow as tf
from tensorflow.keras import layers, models

# Check if GPU is available
print("Num GPUs Available: ", len(tf.config.list_physical_devices('GPU')))

# Enable device placement logging
tf.debugging.set_log_device_placement(True)

# Define a simple CNN model
def create_model():
    model = models.Sequential()
    model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)))
    model.add(layers.MaxPooling2D((2, 2)))
    model.add(layers.Conv2D(64, (3, 3), activation='relu'))
    model.add(layers.MaxPooling2D((2, 2)))
    model.add(layers.Conv2D(64, (3, 3), activation='relu'))

    model.add(layers.Flatten())
    model.add(layers.Dense(64, activation='relu'))
    model.add(layers.Dense(1, activation='sigmoid'))  # For binary classification

    return model

# Create and compile the model
model = create_model()
model.compile(optimizer='adam', 
              loss='binary_crossentropy', 
              metrics=['accuracy'])

# Summary of the model
model.summary()

# Use a dummy dataset (replace with your dataset)
import numpy as np
X_train = np.random.random((100, 64, 64, 3))  # 100 training samples, 64x64x3 image size
y_train = np.random.randint(2, size=(100, 1))  # Binary labels

# Train the model
model.fit(X_train, y_train, epochs=2, batch_size=16)
