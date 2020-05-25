from flask import request
from utils.response_utils import make_success_response
from services.suggestion_skills_service import suggest_skills
from services.suggestion_contractors_service import suggest_contractors


def suggest_contractors_handler():
    body = request.json
    contractor_id = body['contractorId']
    page_options = body['pageOptions']

    result = suggest_contractors(contractor_id, page_options)

    return make_success_response(result)


def suggest_skills_handler():
    body = request.json
    skills = body['skills']

    result = suggest_skills(skills)

    return make_success_response(result)
