from services.db_service import DBService


def get_all_contractors_stats():
    raw_result = DBService.execute("""
        SELECT 'all' AS type, COUNT(*) as value FROM contractors
        UNION
        SELECT 'valid' AS type, COUNT(*) AS value FROM contractors
        where contractors."systemVector" notnull
        UNION
        SELECT 'invalid' AS type, COUNT(*) AS value FROM contractors
        where contractors."systemVector" isnull
        UNION
        SELECT 'withoutLocation' AS type, COUNT(*) AS value FROM contractors
        where contractors."locationId" isnull
        UNION
        SELECT 'withoutCategory' AS type, COUNT(*) AS value FROM contractors
        where contractors."categoryId" isnull
        UNION
        SELECT 'withoutRate' AS type, COUNT(*) AS value FROM contractors WHERE contractors.rate isnull OR contractors.rate = 0
        UNION
        SELECT 'withoutSkills' AS type, COUNT(*) as value FROM contractors c WHERE NOT EXISTS(SELECT css."contractorsId" FROM contractors_skills_skills as css WHERE css."contractorsId" = c.id)
        ORDER BY type
    """)

    result = dict()

    for result_item in raw_result:
        key = result_item[0]
        value = result_item[1]
        result[key] = value

    return result


def get_rate_stats():
    raw_result = DBService.execute("""
        SELECT 'meanRate' as type, AVG(rate) as "value" FROM contractors
    """)

    result = dict()

    for result_item in raw_result:
        key = result_item[0]
        value = result_item[1]
        result[key] = value

    return result


def get_skills_count_per_candidate():
    raw_result = DBService.execute("""
        SELECT c.id, c.rate, COUNT(*) as "skillCount" FROM contractors c
            INNER JOIN contractors_skills_skills css on c.id = css."contractorsId"
            INNER JOIN skills s on css."skillsId" = s.id
        GROUP BY c.id
        ORDER BY c.id
    """)

    result_list = list()

    for result_item in raw_result:
        result_list.append({
            'id': result_item[0],
            'rate': result_item[1],
            'skillCount': result_item[2],
        })

    return result_list
