#!/usr/bin/env python

import config
import plots.word2vec_cost_plot as word2vec_cost
import plots.word2vec_word_time_plot as word2vec_word_time
import plots.word2vec_window_time_plot as word2vec_window_time
import plots.search_plot as search
import plots.data_profiler_plot as data_profiler
from services.db_service import DBService


if __name__ == "__main__":
    DBService.connect(config.db_connection_string)

    # word2vec_cost.plot()
    # word2vec_word_time.plot()
    # word2vec_window_time.plot()
    # search.plot()
    # data_profiler.plot()
