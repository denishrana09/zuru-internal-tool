const express = require('express');

const router = express.Router();

const tokenVerification = require('../../middleware/VerifyToken');
const controller = require('./mail.controller');

router.route('/setEvent')
  .put(tokenVerification, controller.setEvent);

router.route('/getUrl').get(tokenVerification, controller.getUrl);

router.route('/getToken/:id').post(tokenVerification, controller.getToken);

module.exports = router;
