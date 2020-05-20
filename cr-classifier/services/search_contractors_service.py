import time
from utils.time_measure_utils import get_time_measure
from repositiries.identifiers_repository import get_identifiers_batch
from repositiries.contractors_repository import get_all_contractors_with_vectors
from services.vector_component_service import get_category_component, get_location_component, get_rate_component, get_skills_component
from services.math_service import get_distance


def search_contractors(search_filter, page_options):
    start_time = time.time()

    search_filter_vector = get_search_filter_vector(search_filter)
    contractors_with_vectors = get_all_contractors_with_vectors()

    def get_distance_from_search_filter(contractor):
        distance = get_distance(contractor['systemVector'], search_filter_vector)

        return {
            'id': contractor['id'],
            'distance': distance,
            'vector': contractor['systemVector'],
        }

    mapped_results = map(get_distance_from_search_filter, contractors_with_vectors)
    sorted_contractors = sorted(mapped_results, key=lambda item: item['distance'])

    page_start = page_options["page"] * page_options["pageSize"]
    page_end = (page_options["page"] + 1) * page_options["pageSize"]

    result = sorted_contractors[page_start:page_end]

    end_time = time.time()

    return {
        'items': result,
        'total': len(sorted_contractors),
        'time': get_time_measure(start_time, end_time),
        "filterVector": search_filter_vector,
    }


def get_search_filter_vector(search_filter):
    rate_filter_part = get_filter_part(search_filter, 'rate')
    category_filter_part = get_filter_part(search_filter, 'category')
    location_filter_part = get_filter_part(search_filter, 'location')
    skills_filter_part = get_filter_part(search_filter, 'skills')

    rate = rate_filter_part['values'][0]
    category_id = category_filter_part['values'][0]
    location_id = location_filter_part['values'][0]
    skills_ids = skills_filter_part['values']

    mean_rate, category, location, skills = get_identifiers_batch(category_id, location_id, skills_ids)

    return [
        get_rate_component(rate, mean_rate),
        get_category_component(category),
        get_location_component(location),
        get_skills_component(skills),
    ]


def get_filter_part(search_filter, filter_type):
    matches = filter(lambda item: item['type'] == filter_type, search_filter['items'])

    return next(matches)
