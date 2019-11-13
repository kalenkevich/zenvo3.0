const puppeteer = require('puppeteer');

const BrowserSingleton = {
  browser: null,

  async getBrowser() {
    if (this.browser) {
      return this.browser;
    }

    this.browser = await puppeteer.launch({ headless: true });

    return this.browser;
  },

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
};

class BaseScrapper {
  constructor() {
    this.browser = null;
    this.page = null;
    this.url = null;
  }

  async init({ url, width = 1920, height = 926 }) {
    this.url = url;

    await this.initBrowser();
    this.page = await this.browser.newPage();
    await this.page.setViewport({ width, height });
    await this.page.goto(url);
  }

  async initBrowser() {
    this.browser = await BrowserSingleton.getBrowser();
  }

  async closeBrowser() {
    await BrowserSingleton.closeBrowser();
  }
}

module.exports.BaseScrapper = BaseScrapper;
