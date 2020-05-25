import time
from utils.time_measure_utils import get_time_measure
from repositiries.skills_repository import get_all_skills, update_skills_system_id


def classify_skills():
    start_time = time.time()

    all_skills = get_all_skills()
    skills_length = len(all_skills)

    def skills_mapper(skill):
        system_id = skill['id'] / skills_length

        skill['systemId'] = system_id

        return skill

    updated_locations = list(map(skills_mapper, all_skills))
    update_skills_system_id(updated_locations)
    
    end_time = time.time()

    return {
        'totalItems': all_skills,
        'time': get_time_measure(start_time, end_time),
        'identifiers': list(map(lambda skill: {'id': skill['id'], 'systemId': skill['systemId']}, all_skills))
    }
