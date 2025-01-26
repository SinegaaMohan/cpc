# Purpose:
# This script is used to verify the TensorFlow installation and check if the
# host system is properly configured to utilize GPU acceleration. It provides
# information on whether TensorFlow is built with CUDA and GPU support, and it
# prints out the version and build details. This is a preliminary step to ensure
# that the system is ready for running more advanced machine learning tasks
# or deep learning models that require GPU support.

import tensorflow as tf
print(tf.test.is_built_with_cuda())
print(tf.test.is_built_with_gpu_support())
print(tf.__version__)
print(tf.sysconfig.get_build_info())
