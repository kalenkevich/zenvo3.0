from services.db_service import DBService


def get_identifiers_batch(category_id, location_id, skills_ids):
    con = DBService.connection
    cur = con.cursor()

    cur.execute("""
        SELECT -1 as id, AVG(rate) as "systemId", 'mean_rate' as type FROM contractors
        UNION
        SELECT c.id, c."systemId", 'category' as type from categories c WHERE c.id = %s
        UNION
        SELECT l.id, l."systemId", 'location' as type from locations l WHERE l.id = %s
        UNION
        SELECT s.id, s."systemId", 'skills' as type from locations s WHERE s.id in %s
    """, (category_id, location_id, tuple(skills_ids)))

    result = cur.fetchall()
    cur.close()

    def get_value(result_data, type_name):
        return list(map(lambda item: { 'id': item[0], 'systemId': item[1] }, filter(lambda item: item[2] == type_name, result_data)))

    mean_rate = get_value(result, 'mean_rate')[0]['systemId']
    category = get_value(result, 'category')[0]
    location = get_value(result, 'location')[0]
    skills = get_value(result, 'skills')

    return mean_rate, category, location, skills
