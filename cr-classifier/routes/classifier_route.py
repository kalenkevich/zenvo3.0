from utils.response_utils import make_success_response
from services.classifier_skills_service import classify_skills
from services.classifier_categories_service import classify_categories
from services.classifier_locations_service import classify_locations
from services.classifier_contractors_service import classify_contractors


def start_classify_all_features():
    result = dict()

    result['skills'] = start_classify_skills()
    result['categories'] = start_classify_categories()
    result['locations'] = start_classify_locations()
    result['contractors'] = start_classify_contractors()

    return make_success_response(result)


def start_classify_skills():
    result = classify_skills()

    return make_success_response(result)


def start_classify_categories():
    result = classify_categories()

    return make_success_response(result)


def start_classify_locations():
    result = classify_locations()

    return make_success_response(result)


def start_classify_contractors():
    result = classify_contractors()

    return make_success_response(result)

