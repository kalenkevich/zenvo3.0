from plots.word2vec_utils import load_data, plot_data
from services.train_skills_service import train_skills_model


def get_data():
    train_data, emb_size, learning_rate, epochs, batch_size, window_size = load_data()

    result = train_skills_model(
        train_data,
        emb_size,
        learning_rate,
        epochs,
        batch_size,
        window_size,
        should_save_result=False
    )

    costs = result['costs']

    return costs


def plot():
    epochs_and_costs = get_data()

    plot_data(epochs_and_costs, 'epoch', 'Количество итераций', 'epoch_cost', 'L')
