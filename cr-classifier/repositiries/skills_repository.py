from services.db_service import DBService


def get_all_skills():
    con = DBService.connection
    cur = con.cursor()

    cur.execute('SELECT * from skills')

    result = cur.fetchall()

    def result_mapper(skill):
        skill_dict = dict()

        skill_dict["id"] = skill[0]
        skill_dict["name"] = skill[1]
        skill_dict["categoryId"] = skill[2]
        skill_dict["systemId"] = skill[3]

        return skill_dict

    cur.close()

    return list(map(result_mapper, result))


def update_skills_system_id(skills):
    con = DBService.connection
    cur = con.cursor()

    for skill in skills:
        cur.execute('UPDATE skills SET "systemId" = %s WHERE skills.id = %s', (skill['systemId'], skill['id']))

    con.commit()
    cur.close()

    return True
