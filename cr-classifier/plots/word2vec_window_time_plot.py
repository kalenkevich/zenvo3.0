from plots.word2vec_utils import load_data, plot_data
from services.train_skills_service import train_skills_model


def get_window_size_and_time_data():
    all_train_data, emb_size, learning_rate, epochs, batch_size, window_size = load_data()
    all_train_data_len = len(all_train_data)
    data_and_time = []

    for iteration in range(3, all_train_data_len - 3):
        result = train_skills_model(
            all_train_data,
            emb_size,
            learning_rate,
            epochs,
            batch_size,
            window_size=iteration,
            should_save_result=False,
        )
        data_and_time.append({
            'window_size': iteration,
            'timeRaw': result['timeRaw']
        })

    return data_and_time


def plot():
    window_size_and_time = get_window_size_and_time_data()

    plot_data(window_size_and_time, 'window_size', 'Размер окна', 'timeRaw', 'Время')
