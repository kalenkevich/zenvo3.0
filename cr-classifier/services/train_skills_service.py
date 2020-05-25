import time
import numpy as np
from utils.time_measure_utils import get_time_measure
from repositiries.train_repository import save_skills_trained_data
from services.word2vec import skipgram_model_training, mapping, generate_training_data, forward_propagation


def train_skills_model(tokens, emb_size=50, learning_rate=0.05, epochs=5000, batch_size=128, should_save_result=True):
    start_time = time.time()

    word_to_id, id_to_word = mapping(tokens)

    X, Y = generate_training_data(tokens, word_to_id, 3)
    vocab_size = len(id_to_word)

    m = Y.shape[1]
    Y_one_hot = np.zeros((vocab_size, m))
    Y_one_hot[Y.flatten(), np.arange(m)] = 1

    trained_params, cost_results = skipgram_model_training(
        X,
        Y_one_hot,
        vocab_size,
        emb_size,
        learning_rate,
        epochs,
        batch_size,
        parameters=None,
    )

    X_test = np.arange(vocab_size)
    X_test = np.expand_dims(X_test, axis=0)
    softmax_test, _ = forward_propagation(X_test, trained_params)
    top_sorted_indexes = np.argsort(softmax_test, axis=0)[-4:, :]

    top_sorted_indexes_array = get_serializable_indexes_result(top_sorted_indexes)

    if should_save_result:
        result_to_save = {
            'vocab_size': vocab_size,
            'word_to_id': word_to_id,
            'id_to_word': id_to_word,
            'top_sorted_indexes': top_sorted_indexes_array,
        }

        save_skills_trained_data(result_to_save)

    end_time = time.time()

    return {
        'vocab_size': vocab_size,
        'word_to_id': word_to_id,
        'id_to_word': id_to_word,
        'top_sorted_indexes': top_sorted_indexes_array,
        'const': cost_results,
        'time': get_time_measure(start_time, end_time),
    }


def get_serializable_indexes_result(top_sorted_indexes):
    def int64_to_int(number):
        return int(number)

    def sorted_index_to_array(item):
        return list(map(int64_to_int, item))

    return list(map(sorted_index_to_array, top_sorted_indexes))
