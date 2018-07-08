const service = require('./auth.service');
const { getSuccessResponse } = require('../../middleware/ResponseGenerator');

require('dotenv-safe').config({
  allowEmptyValues: true,
});

module.exports = {
  login: async (req, res, next) => {
    try {
      const loginResponse = await service.login(req.body);
      res.json(getSuccessResponse({
        loginResponse,
      }));
    } catch (err) {
      next(err);
    }
  },
};
