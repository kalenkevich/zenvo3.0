const { Logger } = require('../../services/Logger');
const { BaseScrapper } = require('../base/BaseScrapper');
const { RelaxScrapper } = require('./RelaxScrapper');

class RelaxBatchScrapper extends BaseScrapper {
  async scrape() {
    const urlsToScrape = await this.page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        let distance = 100;

        let timer = setInterval(() => {
          let scrollHeight = document.body.scrollHeight;

          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });

      return [...document.querySelectorAll('.PlaceList__itemWrapper > div > a')].map(({ href }) => href);
    });

    await this.page.close();

    const profiles = await Promise.all((urlsToScrape || []).map(async (url) => {
      Logger.debug(`[RelaxBatchPhotographerScrapper.scrape] scrape: url - ${url}`);

      let profile;

      try {
        const scraper = new RelaxScrapper();

        await scraper.init({ url });

        profile = await scraper.scrape();

        Logger.debug(`[RelaxBatchPhotographerScrapper.scrape] scrape url finished: url - ${url}, data - ${JSON.stringify(profile)}`);
      } catch (error) {
        Logger.error(`[RelaxBatchPhotographerScrapper.scrape] error while scrape: url - ${url}, error - ${error}`);
      }

      return profile;
    }));

    return (profiles || []).filter(res => res);
  }
}

module.exports.RelaxBatchScrapper = RelaxBatchScrapper;
