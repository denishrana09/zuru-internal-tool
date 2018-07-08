const Joi = require('joi');

module.exports = {
  addOrUpdateDesignation: {
    body: {
      name: Joi.string().required(),
    },
  },
};
