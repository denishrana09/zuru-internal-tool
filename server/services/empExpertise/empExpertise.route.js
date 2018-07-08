const express = require('express');
const validation = require('express-validation');

const router = express.Router();

const verifyToken = require('../../middleware/VerifyToken');
const controller = require('./empExpertise.controller');
const employeeExpertiseValidation = require('./empExpertise.validation');

router.route('/:id')
  .get(verifyToken, controller.getExpertiseByEmployeeId)
  .delete(validation(employeeExpertiseValidation.deleteEmployeeExpertise),
    verifyToken, controller.deleteExpertiseByEmployeeId)
  .post(validation(employeeExpertiseValidation.addEmployeeExpertise),
    verifyToken, controller.addExpertiseByEmployeeId);

module.exports = router;
