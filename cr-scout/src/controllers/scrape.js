const { Logger } = require('../services/Logger');
const { RelaxPhotographerScrapper } = require('../scrape/relax/RelaxPhotographerScrapper');
const { RelaxBatchPhotographerScrapper } = require('../scrape/relax/RelaxBatchPhotographerScrapper');

module.exports = (app) => {
  app.post('/scrape/profile', async (req, res) => {
    try {
      const { url } = req.body;

      const relaxPhotographerScrapper = new RelaxPhotographerScrapper();
      await relaxPhotographerScrapper.init({ url });

      const result = await relaxPhotographerScrapper.scrape();
      await relaxPhotographerScrapper.closeBrowser();

      return res.status(200).json({
        status: 0,
        result,
      });
    } catch (error) {
      Logger.error(error.message);

      return res.status(500).json({
        status: -2,
        result: null,
        error: error.message,
      });
    }
  });

  app.post('/scrape/profile/batch', async (req, res) => {
    try {
      const { url } = req.body;

      const relaxBatchPhotographerScrapper = new RelaxBatchPhotographerScrapper();
      await relaxBatchPhotographerScrapper.init({ url });

      const result = await relaxBatchPhotographerScrapper.scrape();
      await relaxBatchPhotographerScrapper.closeBrowser();

      return res.status(200).json({
        status: 0,
        result,
      });
    } catch (error) {
      Logger.error(error.message);

      return res.status(500).json({
        status: -2,
        result: null,
        error: error.message,
      });
    }
  });
};
