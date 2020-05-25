from utils.response_utils import make_success_response
from services.statistics_service import get_contractors_stats, get_rate_stats, get_skills_count_per_candidate_stats


def all_statistics_handler():
    result = dict()

    result['contractors'] = get_contractors_stats()
    result['rate'] = get_rate_stats()
    result['skillsPerCandidate'] = get_skills_count_per_candidate_stats()

    return make_success_response(result)


def contractor_statistics_handler():
    contractor_stats = get_contractors_stats()

    return make_success_response(contractor_stats)


def get_skills_count_per_candidate():
    contractor_stats = get_skills_count_per_candidate()

    return make_success_response(contractor_stats)
