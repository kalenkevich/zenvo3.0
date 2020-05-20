import time
from utils.time_measure_utils import get_time_measure
from repositiries.contractors_repository import get_all_contractors, update_contractor_system_vector


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
        'totalItems': all_contractors,
        'meanRate': mean_rate,
        'time': get_time_measure(start_time, end_time),
        'vectors': list(map(lambda contractor: {'id': contractor['id'], 'systemVector': contractor['systemVector']}, all_contractors))
    }


def get_contractor_vector(contractor, mean_rate):
    rate_component = contractor['rate'] - mean_rate
    category_component = contractor['category']['systemId']
    location_component = contractor['location']['systemId']
    skills_component = get_skills_component(contractor['skills'])

    return [rate_component, category_component, location_component, skills_component]


def get_mean_rate(all_contractors):
    contractors_length = len(all_contractors)

    return sum(map(lambda contractor: contractor['rate'], all_contractors)) / contractors_length


def get_skills_component(candidate_skills):
    skills_length = len(candidate_skills)

    return sum(map(lambda skill: skill['systemId'], candidate_skills)) / skills_length
