const { makeSuccessResponse } = require('../utils/ResponseUtils');

module.exports = (app) => {
  app.get('/noop', (req, res) => makeSuccessResponse(res, true));
};
