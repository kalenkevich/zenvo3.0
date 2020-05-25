import os
import json
from services.cache_service import CacheService


def save_skills_trained_data(trained_result):
    file_path = os.path.join(os.getcwd(), 'resources', 'skills_w2v.json')

    with open(file_path, "w") as text_file:
        json.dump(trained_result, text_file)

    return True


def load_skills_trained_data():
    result_cache_key = 'skills_w2v_result'
    cached_value = CacheService.get(result_cache_key)

    if cached_value is not None:
        return cached_value

    file_path = os.path.join(os.getcwd(), 'resources', 'skills_w2v.json')

    with open(file_path, "r") as text_file:
        result = json.load(text_file)

    CacheService.set(result_cache_key, result)

    return result
