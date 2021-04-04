import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import tensorflow as tf


file_path = 'C:/Users/Zizou/PycharmProjects/temp/data/Temper.csv'
data=pd.read_csv(file_path, delimiter=',',header=11,skipinitialspace=True)
data.head(24)
temperature = np.array(data['Temperature'])
print(temperature)

num_periods = num_test
f_horizon = 1
x_train = temperature[:(len(temperature) - (num_periods * 2))]
x_batches = x_train.reshape(-1, num_periods, 1)

y_train = temperature[1:(len(temperature) - (num_periods * 2)) + f_horizon]
y_batches = y_train.reshape(-1, num_periods, 1)


def test_data(series, forecast, num):
    testX = temperature[-(num + forecast):][:num].reshape(-1, num_periods, 1)
    testY = temperature[-(num):].reshape(-1, num_periods, 1)
    return testX, testY


X_test, Y_test = test_data(temperature, f_horizon, num_periods * 2)
print(X_test.shape)

# Training model
tf.reset_default_graph()
rnn_size = 100
learning_rate = 0.001

X = tf.placeholder(tf.float32, [None, num_periods, 1])
Y = tf.placeholder(tf.float32, [None, num_periods, 1])

rnn_cells = tf.contrib.rnn.BasicRNNCell(num_units=rnn_size, activation=tf.nn.relu)
rnn_output, states = tf.nn.dynamic_rnn(rnn_cells, X, dtype=tf.float32)

output = tf.reshape(rnn_output, [-1, rnn_size])
logit = tf.layers.dense(output, 1, name="softmax")

outputs = tf.reshape(logit, [-1, num_periods, 1])
print(logit)

loss = tf.reduce_sum(tf.square(outputs - Y))

accuracy = tf.reduce_mean(tf.cast(tf.equal(tf.argmax(logit, 1), tf.cast(Y, tf.int64)), tf.float32))
optimizer = tf.train.AdamOptimizer(learning_rate=learning_rate)
train_step = optimizer.minimize(loss)

epochs = 1000

sess = tf.Session()
init = tf.global_variables_initializer()
sess.run(init)
dropout_keep_prob = tf.placeholder(tf.float32, name="dropout_keep_prob")

for epoch in range(epochs):
    train_dict = {X: x_batches, Y: y_batches, dropout_keep_prob: 1}
    sess.run(train_step, feed_dict=train_dict)

saver = tf.train.Saver()
save_path = saver.save(sess, "models/model.ckpt")

with tf.Session() as sess:
    # Restore variables from disk.
    saver.restore(sess, "models/model.ckpt")
    y_pred = sess.run(outputs, feed_dict={X: X_test})
    print(y_pred)

plt.title("Compare Weather Forecast vs Actual", fontsize=14)
plt.plot(pd.Series(np.ravel(Y_test)), "bo", markersize=10, label="Actual")
plt.plot(pd.Series(np.ravel(y_pred)), "r.", markersize=10, label="Forecast")
plt.legend(loc="upper left")
plt.xlabel("Time Periods")
plt.show()
