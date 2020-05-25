import time
from utils.time_measure_utils import get_time_measure
from services.search_contractors_service import get_contractor_vector, find_closet_contractors


def suggest_contractors(contractor_id, page_options):
    start_time = time.time()

    contractor_vector = get_contractor_vector(contractor_id)
    result = find_closet_contractors(contractor_vector, page_options)

    end_time = time.time()

    return {
        'items': result['items'],
        'total': result['total'],
        'time': get_time_measure(start_time, end_time),
        'timeRaw': end_time - start_time,
        'inputVector': result['inputVector'],
    }
