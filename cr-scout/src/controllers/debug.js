module.exports = (app) => {
  app.get('/noop', (req, res) => res.status(200).json({
    status: 0,
    result: 'Server alive',
  }));
};
