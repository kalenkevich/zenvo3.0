const Logger = require('../services/Logger').Logger;
const RelaxPhotographerScrapper = require('../scrape/relax/RelaxPhotographerScrapper').RelaxPhotographerScrapper;

module.exports = (app) => {
  app.post('/scrape/profile', async (req, res) => {
    try {
      const { url } = req.body;

      this.relaxPhotographerScrapper = new RelaxPhotographerScrapper();
      await this.relaxPhotographerScrapper.init({ url });

      const result = await this.relaxPhotographerScrapper.scrape();

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
