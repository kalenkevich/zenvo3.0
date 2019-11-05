const puppeteer = require('puppeteer');

class BaseScrapper {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init({ url, width = 1920, height = 926 }) {
    this.browser = await puppeteer.launch({ headless: true });
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width, height });
    await this.page.goto(url);
  }

  processPage() {
    throw Error('[BaseScrapper.processPage]: processPage method should be overrated!');
  }
}

module.exports.BaseScrapper = BaseScrapper;
