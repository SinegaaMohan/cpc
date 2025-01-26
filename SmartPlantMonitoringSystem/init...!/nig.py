# Purpose:
# This code benchmarks the performance of TensorFlow on the host system, specifically
# checking if TensorFlow is utilizing the GPU for computations. It performs a large
# matrix multiplication operation to measure the computation time and calculates
# the performance in terms of TFLOPS. This helps confirm whether the system's GPU is
# properly set up for heavy computations, making it useful before running complex
# deep learning models in a larger project.

import tensorflow as tf
import time

#Check if TensorFlow is using GPU
gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
    try:
        # Set memory growth to avoid TensorFlow consuming all GPU memory at once
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
        print(f"TensorFlow is using GPU: {gpus}")
    except RuntimeError as e:
        print(e)
else:
    print("No GPU available. Running on CPU.")

#Define the operation
def benchmark():
    a = tf.random.uniform((10000, 10000))
    b = tf.random.uniform((10000, 10000))

    start_time = time.time()
    c = tf.matmul(a, b)
    tf.reduce_sum(c).numpy()  # To force computation on GPU
    end_time = time.time()

    return end_time - start_time

#Measure the time taken
time_taken = benchmark()
flops = 2 * 10000**3  # Matrix multiplication of two 10000x10000 matrices
tflops = flops / time_taken / 1e12  # Convert to TFLOPS

print(f'Time taken: {time_taken:.4f} seconds')
print(f'Performance: {tflops:.2f} TFLOPS')
