import repositiries.stats_repository as stats


def get_contractors_stats():
    return stats.get_all_contractors_stats()


def get_rate_stats():
    return stats.get_rate_stats()


def get_skills_count_per_candidate_stats():
    return stats.get_skills_count_per_candidate()
