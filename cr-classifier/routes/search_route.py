from flask import request
from utils.response_utils import make_success_response
from services.search_contractors_service import search_contractors


def search_contractors_handler():
    body = request.json
    search_filter = body['filter']
    page_options = body['pageOptions']

    result = search_contractors(search_filter, page_options)

    return make_success_response(result)
