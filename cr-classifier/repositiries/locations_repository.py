from services.db_service import DBService


def get_all_locations():
    con = DBService.connection
    cur = con.cursor()

    cur.execute('SELECT * from locations')

    result = cur.fetchall()

    def result_mapper(location):
        location_dict = dict()

        location_dict["id"] = location[0]
        location_dict["name"] = location[1]
        location_dict["latitude"] = location[2]
        location_dict["longitude"] = location[3]
        location_dict["city"] = location[4]
        location_dict["country"] = location[5]
        location_dict["point"] = location[6]
        location_dict["systemId"] = location[7]

        return location_dict

    cur.close()

    return list(map(result_mapper, result))


def update_location_system_id(locations):
    con = DBService.connection
    cur = con.cursor()

    for location in locations:
        cur.execute('UPDATE locations SET "systemId" = %s WHERE locations.id = %s', (location['systemId'], location['id']))

    con.commit()
    cur.close()

    return True
