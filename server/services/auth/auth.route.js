const express = require('express');
const validate = require('express-validation');
const controller = require('./auth.controller');
const authValidation = require('./auth.validation');

const router = express.Router();

router.route('/login')
  .post(validate(authValidation.login), controller.login);

module.exports = router;
