const express = require('express');
const validation = require('express-validation');

const router = express.Router();

const VerifyToken = require('../../middleware/VerifyToken');
const departmentController = require('./department.controller');
const departmentValidation = require('./department.validation');

router.route('/')
  .get(VerifyToken, departmentController.getAllDepartment)
  .post(validation(departmentValidation.addOrUpdateDepartment),
    VerifyToken, departmentController.createNewDepartment);

router.route('/:id')
  .get(VerifyToken, departmentController.getDepartmentById)
  .put(validation(departmentValidation.addOrUpdateDepartment),
    VerifyToken, departmentController.updateDepartmentById)
  .delete(VerifyToken, departmentController.deleteDepartmentById);

module.exports = router;
