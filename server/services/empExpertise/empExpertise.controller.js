const service = require('./empExpertise.service');
const { getSuccessResponse, getErrorResponse } = require('../../middleware/ResponseGenerator');

const getError = (err, res) => {
  const errorResponse = getErrorResponse(err);
  res.status(errorResponse.httpStatusCode).json(errorResponse.body);
};

module.exports = {
  getExpertiseByEmployeeId: async (req, res) => {
    const empId = req.params.id;
    try {
      const expertise = await service.getExpertiseById(empId);
      res.json(getSuccessResponse(expertise));
    } catch (err) {
      getError(err, res);
    }
  },

  deleteExpertiseByEmployeeId: async (req, res) => {
    try {
      const employeeId = req.params.id;
      const { expertiseId } = req.body;
      try {
        await service.deleteExpertiseById(employeeId, expertiseId);
        res.json(getSuccessResponse({}));
      } catch (err) {
        getError(err, res);
      }
    } catch (err) {
      getError(err, res);
    }
  },

  addExpertiseByEmployeeId: async (req, res) => {
    try {
      const employeeId = req.params.id;
      const { expertiseArray } = req.body;
      await service.addExpertiseById(employeeId, expertiseArray,
        req.user.user.id, req.user.user.id);
      res.json(getSuccessResponse({}));
    } catch (err) {
      getError(err, res);
    }
  },
};
