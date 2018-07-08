const Joi = require('joi');

module.exports = {
  addCandidateExpertise: {
    body: {
      expertiseArray: Joi.required(),
    },
  },
  deleteCandidateExpertise: {
    body: {
      expertiseId: Joi.required(),
    },
  },
};
