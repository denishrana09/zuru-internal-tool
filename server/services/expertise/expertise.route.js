const express = require('express');
const validation = require('express-validation');

const router = express.Router();

const VerifyToken = require('../../middleware/VerifyToken');
const controller = require('./expertise.controller');
const expertiseValidation = require('./expertise.validation');

router.route('/')
  .get(VerifyToken, controller.getAllExpertises)
  .post(validation(expertiseValidation.addOrUpdateExpertise),
    VerifyToken, controller.createNewExpertise);

router.route('/:id')
  .get(VerifyToken, controller.getExpertiseById)
  .put(validation(expertiseValidation.addOrUpdateExpertise),
    VerifyToken, controller.updateExpertiseById)
  .delete(VerifyToken, controller.deleteExpertiseById);

module.exports = router;
