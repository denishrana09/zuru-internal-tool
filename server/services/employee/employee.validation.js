const Joi = require('joi');

module.exports = {
  addEmployee: {
    body: {
      firstname: Joi.string().required(),
      middlename: Joi.string(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      mobile: Joi.string().required(),
      password: Joi.string().required().min(5),
      code: Joi.string().required(),
      departmentId: Joi.required(),
      roleId: Joi.required(),
      designationId: Joi.required(),
    },
  },

  updateEmployee: {
    body: {
      firstname: Joi.string().required(),
      middlename: Joi.string(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      mobile: Joi.string().required(),
      code: Joi.string().required(),
      departmentId: Joi.required(),
      roleId: Joi.required(),
      designationId: Joi.required(),
      pictureUrl: Joi.string().required(),
      birthdate: Joi.required(),
      experience: Joi.required(),
    },
  },

  reviewCandidate: {
    body: {
      status: Joi.string().required(),
      remarks: Joi.string(),
    },
  },
};
