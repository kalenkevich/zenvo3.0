from plots.word2vec_utils import load_data, plot_data
from services.train_skills_service import train_skills_model


def get_words_count_and_time_data():
    all_train_data, emb_size, learning_rate, epochs, batch_size, window_size = load_data()
    all_train_data_len = len(all_train_data)

    data_and_time = []

    for iteration in range(window_size, all_train_data_len - window_size, window_size):
        result = train_skills_model(
            all_train_data[0:iteration],
            emb_size,
            learning_rate,
            epochs,
            batch_size,
            window_size,
            should_save_result=False,
        )
        data_and_time.append({
            'words_count': iteration,
            'timeRaw': result['timeRaw']
        })

    return data_and_time


def plot():
    words_count_and_time = get_words_count_and_time_data()

    plot_data(words_count_and_time, 'words_count', 'Кол-во слов', 'timeRaw', 'Время')
