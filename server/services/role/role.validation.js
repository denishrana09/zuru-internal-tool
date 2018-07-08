const Joi = require('joi');

module.exports = {
  addOrUpdateRole: {
    body: {
      role: Joi.string().required(),
    },
  },
};
