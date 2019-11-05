const Server = require('./Server').CrScoutServer;

const port = process.env.PORT || 3001;

const server = new Server({ port });

(async () => {
  server.init();
  server.run();

  await server.scrape();
})();
