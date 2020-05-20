import time
from repositiries.locations_repository import get_all_locations, update_location_system_id


"""
Latitude : max/min +90 to -90

Longitude : max/min +180 to -180
"""
def classify_locations():
    start_time = time.time()

    all_locations = get_all_locations()
    location_length = len(all_locations)

    def location_mapper(location):
        system_id = location['id'] / location_length

        location['systemId'] = system_id

        return location

    updated_locations = list(map(location_mapper, all_locations))
    update_location_system_id(updated_locations)
    
    end_time = time.time()

    return {
        'totalItems': location_length,
        'time': 'all done at {0} seconds'.format(end_time - start_time)
    }
