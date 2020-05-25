const { Logger } = require('../services/Logger');
const { RelaxScrapper } = require('../scrape/relax/RelaxScrapper');
const { RelaxBatchScrapper } = require('../scrape/relax/RelaxBatchScrapper');
const { makeSuccessResponse, makeErrorResponse } = require('../utils/ResponseUtils');

module.exports = (app) => {
  app.post('/scrape/profile', async (req, res) => {
    try {
      const { url } = req.body;

      const relaxScrapper = new RelaxScrapper();
      await relaxScrapper.init({ url });

      const result = await relaxScrapper.scrape();
      await relaxScrapper.closeBrowser();

      return makeSuccessResponse(res, result);
    } catch (error) {
      Logger.error(error.message);

      return makeErrorResponse(res, error);
    }
  });

  app.post('/scrape/profile/batch', async (req, res) => {
    try {
      const { url } = req.body;

      const relaxBatchScrapper = new RelaxBatchScrapper();
      await relaxBatchScrapper.init({ url });

      const result = await relaxBatchScrapper.scrape();
      await relaxBatchScrapper.closeBrowser();

      return makeSuccessResponse(res, result);
    } catch (error) {
      Logger.error(error.message);

      return makeErrorResponse(res, error);
    }
  });
};
