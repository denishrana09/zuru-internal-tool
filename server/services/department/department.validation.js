const Joi = require('joi');

module.exports = {
  addOrUpdateDepartment: {
    body: {
      name: Joi.string().required(),
    },
  },
};
