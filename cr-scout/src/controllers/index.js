const scrapeController = require('./scrape');
const debugController = require('./debug');

module.exports.controllers = [
  scrapeController,
  debugController,
];
