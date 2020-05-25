from flask import request
from utils.request_utils import get_float_value, get_int_value
from utils.response_utils import make_success_response
from services.train_skills_service import train_skills_model


def train_skills_model_handler():
    body = request.json
    train_data = body['sequence']
    emb_size = get_int_value(body['embSize'], 50)
    learning_rate = get_float_value(body['learningRate'], 0.05)
    epochs = get_int_value(body['epochs'], 5000)
    batch_size = get_int_value(body['batchSize'], 128)
    should_save_result = body['save']

    if should_save_result is None:
        should_save_result = True

    result = train_skills_model(
        train_data,
        emb_size,
        learning_rate,
        epochs,
        batch_size,
        should_save_result
    )

    return make_success_response(result)
