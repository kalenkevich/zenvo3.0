from utils.response_utils import make_success_response
from services.classifier_skills_service import classify_skills
from services.classifier_categories_service import classify_categories
from services.classifier_locations_service import classify_locations
from services.classifier_contractors_service import classify_contractors


def classify_all_features_handler():
    result = dict()

    result['skills'] = classify_skills()
    result['categories'] = classify_categories()
    result['locations'] = classify_locations()
    result['contractors'] = classify_contractors()

    return make_success_response(result)


def classify_skills_handler():
    result = classify_skills()

    return make_success_response(result)


def classify_categories_handler():
    result = classify_categories()

    return make_success_response(result)


def classify_locations_handler():
    result = classify_locations()

    return make_success_response(result)


def classify_contractors_handler():
    result = classify_contractors()

    return make_success_response(result)

