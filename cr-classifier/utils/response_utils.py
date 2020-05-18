from flask import jsonify


def make_success_response(result):
    if result is None:
        return {
            'status': 'OK',
            'message': 'null',
            'result': ''
        }

    if result == True:
        return {
            'status': 'OK',
            'message': 'null',
            'result': 'true'
        }

    if result == False:
        return {
            'status': 'OK',
            'message': 'null',
            'result': 'false'
        }

    return jsonify({
        'status': 'OK',
        'message': 'null',
        'result': result
    })


def make_error_response(error_message):
    return {
        'status': 'Error',
        'message': error_message,
    }
