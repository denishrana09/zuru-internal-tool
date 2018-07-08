const express = require('express');
const validation = require('express-validation');

const router = express.Router();

const verifyToken = require('../../middleware/VerifyToken');
const controller = require('./role.controller');
const roleValidation = require('./role.validation');

router.route('/')
  .get(verifyToken, controller.getAllRoles)
  .post(validation(roleValidation.addOrUpdateRole), verifyToken, controller.createNewRole);

router.route('/:id')
  .get(verifyToken, controller.getRoleById)
  .put(validation(roleValidation.addOrUpdateRole), verifyToken, controller.updateRoleById)
  .delete(verifyToken, controller.deleteRoleById);

module.exports = router;
