const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
  // Let the route handler to what it needs to do
  await next();
  // once route handler is completed then clear cache
  clearHash(req.user.id);
};
