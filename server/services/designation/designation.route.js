const express = require('express');
const validation = require('express-validation');

const router = express.Router();

const verifyToken = require('../../middleware/VerifyToken');
const designationController = require('./designation.controller');
const designationValidation = require('./designation.validation');

router.route('/')
  .get(verifyToken, designationController.getAllDesignation)
  .post(validation(designationValidation.addOrUpdateDesignation),
    verifyToken, designationController.createNewDesignation);

router.route('/:id')
  .get(verifyToken, designationController.getDesignationById)
  .put(validation(designationValidation.addOrUpdateDesignation),
    verifyToken, designationController.updateDesignationById)
  .delete(verifyToken, designationController.deleteDesignationById);

module.exports = router;
