const service = require('./department.service');
const { getSuccessResponse, getErrorResponse } = require('../../middleware/ResponseGenerator');

const getError = (err, res) => {
  const errorResponse = getErrorResponse(err);
  res.status(errorResponse.httpStatusCode).json(errorResponse.body);
};

module.exports = {
  getAllDepartment: async (req, res) => {
    try {
      const allDepartments = await service.getAllDepartment();
      res.json(getSuccessResponse(allDepartments));
    } catch (err) {
      getError(err, res);
    }
  },

  getDepartmentById: async (req, res) => {
    try {
      const departmentId = req.params.id;
      const department = await service.getDepartmentById(departmentId);
      res.json(getSuccessResponse(department));
    } catch (err) {
      getError(err, res);
    }
  },

  updateDepartmentById: async (req, res, next) => {
    try {
      const departmentId = req.params.id;
      const departmentData = {
        name: req.body.name,
        updatedBy: req.user.user.id,
      };
      try {
        await service.updateDepartmentById(departmentId, departmentData);
        res.json(getSuccessResponse({ departmentId }));
      } catch (err) {
        next(new Error('UNIQUE_CONSTRAINT_ERROR'));
      }
    } catch (err) {
      getError(err, res);
    }
  },

  deleteDepartmentById: async (req, res) => {
    try {
      const departmentId = req.params.id;
      await service.deleteDepartmentById(departmentId);
      res.json(getSuccessResponse({ departmentId }));
    } catch (err) {
      getError(err, res);
    }
  },

  createNewDepartment: async (req, res, next) => {
    try {
      try {
        const departmentData = {
          name: req.body.name,
          createdBy: req.user.user.id,
          updatedBy: req.user.user.id,
        };
        await service.createNewDepartment(departmentData);
        res.json(getSuccessResponse({}));
      } catch (err) {
        next(new Error('UNIQUE_CONSTRAINT_ERROR'));
      }
    } catch (err) {
      getError(err, res);
    }
  },
};
