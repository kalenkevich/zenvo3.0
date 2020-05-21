from math import radians, cos, sin, asin, sqrt


def get_contractor_vector(contractor, mean_rate):
    rate_component = get_rate_component(contractor['rate'],  mean_rate)
    category_component = get_category_component(contractor['category'])
    location_component = get_location_component(contractor['location'])
    skills_component = get_skills_component(contractor['skills'])

    return [rate_component, category_component, location_component, skills_component]


def get_rate_component(rate, mean_rate):
    return float(rate) - float(mean_rate)


def get_category_component(category):
    return category['systemId']


def get_location_component(location):
    return location['systemId']


def get_skills_component(candidate_skills):
    skills_length = len(candidate_skills)

    return sum(map(lambda skill: skill['systemId'], candidate_skills)) / skills_length
