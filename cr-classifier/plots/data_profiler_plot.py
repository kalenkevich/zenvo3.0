import matplotlib.pyplot as plt
import services.statistics_service as stats


def plot_data(data):
    items = ['все', 'полные', 'без навыков']
    height = [data['all'], data['valid'], data['withoutSkills']]
    plt.bar(items, height)
    plt.show()


def get_data():
    return stats.get_contractors_stats()


def plot():
    data = get_data()
    plot_data(data)
