import psycopg2


class DBService:
    connection = None

    @staticmethod
    def connect(connection_string):
        DBService.connection = psycopg2.connect(connection_string)

        print('Connected to DB successfully!')

        return DBService.connection

    @staticmethod
    def execute(query):
        con = DBService.connection
        cur = con.cursor()

        cur.execute(query)

        raw_result = cur.fetchall()
        cur.close()

        return raw_result