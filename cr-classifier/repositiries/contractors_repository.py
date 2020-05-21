from services.db_service import DBService


def get_all_contractors():
    con = DBService.connection
    cur = con.cursor()

    cur.execute("""
        SELECT
            c.id,
            c.rate,
            c."systemVector",
            row_to_json(category) AS category,
            row_to_json(location) AS location,
            json_agg(row_to_json(skill)) as skills
        from contractors c
            LEFT JOIN categories category ON c."categoryId" = category."id"
            LEFT JOIN locations location ON c."locationId" = location."id"
            INNER JOIN contractors_skills_skills css on c.id = css."contractorsId"
            INNER JOIN skills skill on css."skillsId" = skill."id"
        GROUP BY c.id, category.id, location.id, css."contractorsId"
        ORDER BY c."id"
    """)

    result = cur.fetchall()

    def result_mapper(contractor):
        contractor_dict = dict()

        contractor_dict["id"] = contractor[0]
        contractor_dict["rate"] = contractor[1]
        contractor_dict["systemVector"] = contractor[2]
        contractor_dict["category"] = contractor[3]
        contractor_dict["location"] = contractor[4]
        contractor_dict["skills"] = contractor[5]

        return contractor_dict

    cur.close()

    return list(map(result_mapper, result))


def update_contractor_system_vector(contractors):
    con = DBService.connection
    cur = con.cursor()

    for contractor in contractors:
        cur.execute('UPDATE contractors SET "systemVector" = %s WHERE contractors.id = %s', (contractor['systemVector'], contractor['id']))

    con.commit()
    cur.close()

    return True


def get_all_contractors_with_vectors():
    con = DBService.connection
    cur = con.cursor()

    cur.execute('SELECT c.id, c."systemVector" FROM contractors c WHERE c."systemVector" notnull')

    result = cur.fetchall()

    def result_mapper(contractor):
        contractor_dict = dict()

        contractor_dict["id"] = contractor[0]
        contractor_dict["systemVector"] = contractor[1]

        return contractor_dict

    cur.close()

    return list(map(result_mapper, result))


def get_contractor_vector(contractor_id):
    con = DBService.connection
    cur = con.cursor()

    cur.execute('SELECT c."systemVector" FROM contractors c WHERE c.id = %s', [contractor_id])

    result = cur.fetchone()

    cur.close()

    return result[0]
