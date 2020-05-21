import time
from math import radians, cos, sin, asin, sqrt
from utils.time_measure_utils import get_time_measure
from services.math_service import get_normalized_value
from repositiries.locations_repository import get_all_locations, update_location_system_id


def classify_locations():
    start_time = time.time()

    all_locations = get_all_locations()
    location_length = len(all_locations)

    def location_mapper(location):
        lat = float(location['latitude'])
        lng = float(location['longitude'])
        r = 6371
        lat, lng = map(radians, [lat, lng])

        a = sin(lat / 2) ** 2 + cos(lat) * sin(lng / 2) ** 2
        distance = 2 * r * asin(sqrt(a))

        location['systemId'] = get_normalized_value(distance, min_value=-2 * r, max_value=2 * r)

        return location

    updated_locations = list(map(location_mapper, all_locations))
    update_location_system_id(updated_locations)
    
    end_time = time.time()

    return {
        'totalItems': location_length,
        'time': get_time_measure(start_time, end_time),
        'identifiers': list(map(lambda location: {'id': location['id'], 'systemId': location['systemId']}, all_locations))
    }
