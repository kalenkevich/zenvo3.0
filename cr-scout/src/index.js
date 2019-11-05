const express = require('express');
const controllers = require('./controllers').controllers;

const port = process.env.PORT || 3001;

class CrScoutServer {
  constructor(config) {
    this.config = config;
    this.app = express();
  }

  init() {
    this.app.use(express.json());
    this.applyControllers();
  }

  applyControllers() {
    (controllers || []).forEach(controller => controller(this.app));
  }

  run() {
    this.app.listen(this.config.port, () => console.log(`CrScout running on port: ${this.config.port}`));
  }
}

const server = new CrScoutServer({ port });

(async () => {
  server.init();
  server.run();
})();
