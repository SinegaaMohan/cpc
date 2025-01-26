import tensorflow as tf
print(tf.test.is_built_with_cuda())
print(tf.test.is_built_with_gpu_support())
print(tf.__version__)
print(tf.sysconfig.get_build_info())