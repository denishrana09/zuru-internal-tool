const express = require('express');
const validation = require('express-validation');

const router = express.Router();

const verifyToken = require('../../middleware/VerifyToken');
const controller = require('./employee.controller');
const employeeValidation = require('./employee.validation');

router.route('/')
  .get(verifyToken, controller.getAllEmployees)
  .post(validation(employeeValidation.addEmployee), verifyToken, controller.createNewEmployee);

router.route('/:id')
  .get(verifyToken, controller.getEmployeeById)
  .put(validation(employeeValidation.updateEmployee), verifyToken, controller.updateEmployee)
  .delete(verifyToken, controller.deleteEmployee);

router.route('/candidate/:employeeId')
  .get(verifyToken, controller.getCandidateByEmployeeId);

router.route('/:employeeId/candidate/:candidateId/review')
  .put(validation(employeeValidation.reviewCandidate), verifyToken, controller.updateReviewStatus);

module.exports = router;
