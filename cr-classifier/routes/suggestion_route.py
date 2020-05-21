import os
import json
from flask import request
from utils.response_utils import make_success_response
from services.classifier_skills_service import suggest_skills
from services.search_contractors_service import suggest_contractors


def suggest_contractors_handler():
    body = request.json
    contractor_id = body['contractorId']
    page_options = body['pageOptions']

    result = suggest_contractors(contractor_id, page_options)

    return make_success_response(result)


def suggest_skills_handler():
    body = request.json
    contractor_id = body['contractorId']
    skills = body['skills']

    tokens = skills

    result, trained_params = suggest_skills(tokens)

    trained_params['W'] = trained_params['W'].tolist()
    trained_params['WRD_EMB'] = trained_params['WRD_EMB'].tolist()

    file_path = os.path.join(os.getcwd(), 'resources', str(contractor_id) + ".json")
    with open(file_path, "w") as text_file:
        json.dump(trained_params, text_file)

    return make_success_response(result)
