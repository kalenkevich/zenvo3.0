import os
import json
import matplotlib.pyplot as plt
from utils.request_utils import get_int_value, get_float_value


def load_data():
    path_parent = os.path.dirname(os.getcwd())
    os.chdir(path_parent)
    file_path = os.path.join(os.getcwd(), 'resources', 'train_skills_input.json')

    with open(file_path, "r") as text_file:
        input_data = json.load(text_file)

    train_data = input_data['sequence']
    emb_size = get_int_value(input_data['embSize'], 50)
    learning_rate = get_float_value(input_data['learningRate'], 0.05)
    epochs = get_int_value(input_data['epochs'], 5000)
    batch_size = get_int_value(input_data['batchSize'], 128)
    window_size = get_int_value(input_data['windowSize'], 3)

    return train_data, emb_size, learning_rate, epochs, batch_size, window_size


def plot_data(data, x_key, x_label, y_key, y_label):
    x_axes = list()
    y_axes = list()

    for item in data:
        x_axes.append(item[x_key])
        y_axes.append(item[y_key])

    plt.plot(x_axes, y_axes)
    plt.xlabel(x_label)
    plt.ylabel(y_label)
    plt.show()
