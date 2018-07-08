const Joi = require('joi');

module.exports = {
  addEmployeeExpertise: {
    body: {
      expertiseArray: Joi.required(),
    },
  },
  deleteEmployeeExpertise: {
    body: {
      expertiseId: Joi.required(),
    },
  },
};
