from services.db_service import DBService


def get_all_categories():
    con = DBService.connection
    cur = con.cursor()

    cur.execute('SELECT * from categories')

    result = cur.fetchall()

    def result_mapper(category):
        category_dict = dict()

        category_dict["id"] = category[0]
        category_dict["name"] = category[1]
        category_dict["systemId"] = category[2]

        return category_dict

    cur.close()

    return list(map(result_mapper, result))


def update_categories_system_id(categories):
    con = DBService.connection
    cur = con.cursor()

    for category in categories:
        cur.execute('UPDATE categories SET "systemId" = %s WHERE categories.id = %s', (category['systemId'], category['id']))

    con.commit()
    cur.close()

    return True
