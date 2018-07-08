const Joi = require('joi');

module.exports = {
  addCandidate: {
    body: {
      firstname: Joi.string().required(),
      middlename: Joi.string(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      mobile: Joi.string().required(),
      designationId: Joi.string().required(),
      experience: Joi.string(),
      pictureUrl: Joi.string(),
      resumeUrl: Joi.string(),
      referrerName: Joi.string(),
      currentEmployer: Joi.string(),
      expertiseArray: Joi.required(),
      interviewerArray: Joi.required(),
    },
  },

  updateCandidate: {
    body: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      mobile: Joi.string().required(),
      designationId: Joi.string().required(),
      experience: Joi.string(),
      pictureUrl: Joi.string(),
      resumeUrl: Joi.string().required(),
      referrerName: Joi.string(),
      currentEmployer: Joi.string(),
    },
  },
  addReview: {
    employeeId: Joi.required(),
  },
  schedule: {
    interviewDatetime: Joi.date().min('now').required(),
    profileReviewStatus: Joi.required(),
  },
};
