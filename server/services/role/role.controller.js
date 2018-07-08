const service = require('./role.service');
const { getSuccessResponse, getErrorResponse } = require('../../middleware/ResponseGenerator');

const getError = (err, res) => {
  const errorResponse = getErrorResponse(err);
  res.status(errorResponse.httpStatusCode).json(errorResponse.body);
};

module.exports = {
  getAllRoles: async (req, res) => {
    try {
      const allRoles = await service.getAllRoles();
      res.json(getSuccessResponse(allRoles));
    } catch (err) {
      getError(err, res);
    }
  },

  getRoleById: async (req, res) => {
    const roleId = req.params.id;
    try {
      const role = await service.getRoleById(roleId);
      res.json(getSuccessResponse(role));
    } catch (err) {
      getError(err, res);
    }
  },

  updateRoleById: async (req, res) => {
    const roleId = req.params.id;
    try {
      const roleData = {
        role: req.body.role,
        updatedBy: req.user.user.id,
      };
      await service.updateRoleById(roleId, roleData);
      res.json(getSuccessResponse({ roleId }));
    } catch (err) {
      getError(err, res);
    }
  },

  deleteRoleById: async (req, res) => {
    const roleId = req.params.id;
    try {
      await service.deleteRoleById(roleId);
      res.json(getSuccessResponse({ roleId }));
    } catch (err) {
      getError(err, res);
    }
  },

  createNewRole: async (req, res, next) => {
    try {
      const roleData = {
        roleName: req.body.role,
        updatedBy: req.user.user.id,
        createdBy: req.user.user.id,
      };
      await service.createNewRole(roleData);
      res.json(getSuccessResponse({}));
    } catch (err) {
      next(new Error('UNIQUE_CONSTRAINT_ERROR'));
    }
  },
};
