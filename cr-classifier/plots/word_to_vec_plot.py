if plot_cost:
    plt.plot(np.arange(epochs), costs)
    plt.xlabel('# of epochs')
    plt.ylabel('cost')