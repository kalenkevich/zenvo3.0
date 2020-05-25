from utils.response_utils import make_success_response


def noop_handler():
    return make_success_response(True)
