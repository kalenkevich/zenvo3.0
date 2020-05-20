import psycopg2


class DBService:
    connection = None

    @staticmethod
    def connect(connection_string):
        DBService.connection = psycopg2.connect(connection_string)

        print('Connected to DB successfully!')

        return DBService.connection
