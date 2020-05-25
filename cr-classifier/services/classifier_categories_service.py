import time
from utils.time_measure_utils import get_time_measure
from repositiries.categories_repository import get_all_categories, update_categories_system_id


def classify_categories():
    start_time = time.time()

    all_categories = get_all_categories()
    categories_length = len(all_categories)

    def categories_mapper(location):
        system_id = location['id'] / categories_length

        location['systemId'] = system_id

        return location

    updated_locations = list(map(categories_mapper, all_categories))
    update_categories_system_id(updated_locations)

    end_time = time.time()

    return {
        'totalItems': categories_length,
        'time': get_time_measure(start_time, end_time),
        'timeRaw': end_time - start_time,
        'identifiers': list(map(lambda category: {'id': category['id'], 'systemId': category['systemId']}, all_categories))
    }
