import time
from utils.time_measure_utils import get_time_measure
from repositiries.contractors_repository import get_all_contractors, update_contractor_system_vector
from services.vector_component_service import get_contractor_vector


def classify_contractors():
    start_time = time.time()

    all_contractors = get_all_contractors()
    mean_rate = get_mean_rate(all_contractors)

    def contractor_mapper(contractor):
        contractor['systemVector'] = get_contractor_vector(contractor, mean_rate)

        return contractor

    updated_contractors = list(map(contractor_mapper, all_contractors))
    update_contractor_system_vector(updated_contractors)

    end_time = time.time()

    return {
        'totalItems': len(all_contractors),
        'meanRate': mean_rate,
        'time': get_time_measure(start_time, end_time),
        'vectors': list(map(lambda contractor: {'id': contractor['id'], 'systemVector': contractor['systemVector']}, all_contractors))
    }


def get_mean_rate(all_contractors):
    contractors_length = len(all_contractors)

    return sum(map(lambda contractor: contractor['rate'], all_contractors)) / contractors_length
