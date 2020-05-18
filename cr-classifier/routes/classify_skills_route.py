import os
from flask import request
import numpy as np
from services.word2vec import skipgram_model_training, tokenize, mapping, generate_training_data, forward_propagation
from utils.response_utils import make_success_response
import json


def get_classified_skills():
    body = request.json
    contractor_id = body['contractorId']
    skills = body['skills']

    tokens = skills

    result, trained_params = classify_text(tokens)

    trained_params['W'] = trained_params['W'].tolist()
    trained_params['WRD_EMB'] = trained_params['WRD_EMB'].tolist()

    file_path = os.path.join(os.getcwd(), 'resources', str(contractor_id) + ".json")
    with open(file_path, "w") as text_file:
        json.dump(trained_params, text_file)

    return make_success_response(result)


def start_classify_skills():
    return make_success_response(True)


def classify_text(tokens):
    word_to_id, id_to_word = mapping(tokens)

    X, Y = generate_training_data(tokens, word_to_id, 3)
    vocab_size = len(id_to_word)

    m = Y.shape[1]
    Y_one_hot = np.zeros((vocab_size, m))
    Y_one_hot[Y.flatten(), np.arange(m)] = 1

    trained_params = skipgram_model_training(
        X,
        Y_one_hot,
        vocab_size,
        50,
        0.05,
        5000,
        batch_size=128,
        parameters=None,
        print_cost=False,
        plot_cost=True,
    )

    X_test = np.arange(vocab_size)
    X_test = np.expand_dims(X_test, axis=0)
    softmax_test, _ = forward_propagation(X_test, trained_params)
    top_sorted_inds = np.argsort(softmax_test, axis=0)[-4:, :]

    result = dict()

    for input_ind in range(vocab_size):
        input_word = id_to_word[input_ind]
        output_words = [id_to_word[output_ind] for output_ind in top_sorted_inds[::-1, input_ind]]

        result[input_word] = output_words

    return result, trained_params