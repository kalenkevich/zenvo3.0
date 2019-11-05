const RelaxPhotographerScrapper = require('../scrape/relax/RelaxPhotographerScrapper').RelaxPhotographerScrapper;

module.exports = (app) => {
  app.post('/scrape/profile', async (req, res) => {
    const { url } = req.body;

    try {
      this.relaxPhotographerScrapper = new RelaxPhotographerScrapper();
      await this.relaxPhotographerScrapper.init({ url });

      const result = await this.relaxPhotographerScrapper.scrape();

      return res.status(200).json({
        status: 0,
        result,
      });
    } catch (error) {
      return res.status(500).json({
        status: -2,
        result: null,
        error: error.message,
      });
    }
  });
};
