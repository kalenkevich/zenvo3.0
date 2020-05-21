from numpy import linalg, array


def get_distance(array_vector_1, array_vector_2):
    vector_1 = array(array_vector_1)
    vector_2 = array(array_vector_2)

    return linalg.norm(vector_1 - vector_2)
