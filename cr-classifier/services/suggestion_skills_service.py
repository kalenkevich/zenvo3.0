import numpy as np
from repositiries.train_repository import load_skills_trained_data


def suggest_skills(skills):
    data = load_skills_trained_data()
    id_to_word = data.get('id_to_word')
    word_to_id = data.get('word_to_id')
    top_sorted_indexes = data.get('top_sorted_indexes')

    np_top_sorted_indexes = to_np_array(top_sorted_indexes)

    result = dict()

    for input_skill in skills:
        skill_id = word_to_id[input_skill]
        output_skills = [id_to_word['{}'.format(output_ind)] for output_ind in np_top_sorted_indexes[::-1, skill_id]]
        result[input_skill] = output_skills

    return result


def to_np_array(default_array):
    def xxxx(item):
        return np.array(item)

    return np.array(list(map(xxxx, default_array)))
