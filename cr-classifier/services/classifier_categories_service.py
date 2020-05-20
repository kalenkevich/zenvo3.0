import time
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
        'time': 'all done at {0} seconds'.format(end_time - start_time)
    }
