const express = require('express');
const controllers = require('./controllers').controllers;

class CrScoutServer {
  constructor(config) {
    this.config = config;
    this.app = express();
  }

  init() {
    this.applyControllers();
  }

  applyControllers() {
    (controllers || []).forEach(controller => controller(this.app));
  }

  run() {
    this.app.listen(this.config.port, () => console.log(`CrScout running on port: ${this.config.port}`));
  }
}

module.exports.CrScoutServer = CrScoutServer;
