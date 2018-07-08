const Joi = require('joi');

module.exports = {
  addOrUpdateExpertise: {
    body: {
      expertiseField: Joi.string().required(),
    },
  },
};
