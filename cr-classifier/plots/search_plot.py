import matplotlib.pyplot as plt
from services.search_contractors_service import search_contractors


def plot_data(times):
    times_len = len(times)
    average = sum(times) / times_len

    plt.plot(range(1, times_len + 1), times)
    plt.xlabel('Номер запроса')
    plt.ylabel('Время ответа, с')

    plt.plot(range(1, times_len + 1), [average] * times_len)

    plt.show()


def get_data():
    times = list()

    search_filter = {
        "name": "",
        "items": [{
            "type": "rate",
            "values": ["3.7"]
        }, {
            "type": "category",
            "values": ["1"]
        }, {
            "type": "location",
            "values": ["16"]
        }, {
            "type": "skills",
            "values": ["1", "2", "3", "4", "6", "7", "8", "9", "10", "11", "12"]
        }]
    }
    page_options = {
        "page": 0,
        "pageSize": 100
    }

    for iteration in range(1, 100):
        result = search_contractors(search_filter, page_options)
        times.append(result['timeRaw'])

    return times


def plot():
    data = get_data()

    plot_data(data)
