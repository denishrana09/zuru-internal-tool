const Joi = require('joi');

module.exports = {
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
    // //for future use
    // params: {
    //     mode: Joi.string().required(),
    //     // password: Joi.string().required()
    // },
  },
};
