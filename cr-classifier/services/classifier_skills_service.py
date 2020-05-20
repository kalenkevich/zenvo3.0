import time
import numpy as np
from utils.time_measure_utils import get_time_measure
from repositiries.skills_repository import get_all_skills, update_skills_system_id
from services.word2vec import skipgram_model_training, mapping, generate_training_data, forward_propagation


def suggest_skills(tokens):
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


def classify_skills():
    start_time = time.time()

    all_skills = get_all_skills()
    skills_length = len(all_skills)

    def skills_mapper(skill):
        system_id = skill['id'] / skills_length

        skill['systemId'] = system_id

        return skill

    updated_locations = list(map(skills_mapper, all_skills))
    update_skills_system_id(updated_locations)
    
    end_time = time.time()

    return {
        'totalItems': all_skills,
        'time': get_time_measure(start_time, end_time),
        'identifiers': list(map(lambda skill: {'id': skill['id'], 'systemId': skill['systemId']}, all_skills))
    }
