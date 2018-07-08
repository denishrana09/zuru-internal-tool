const service = require('./designation.service');
const { getSuccessResponse, getErrorResponse } = require('../../middleware/ResponseGenerator');

const getError = (err, res) => {
  const errorResponse = getErrorResponse(err);
  res.status(errorResponse.httpStatusCode).json(errorResponse.body);
};

module.exports = {
  getAllDesignation: async (req, res) => {
    try {
      const allDesignations = await service.getAllDesignation();
      res.json(getSuccessResponse(allDesignations));
    } catch (err) {
      getError(err, res);
    }
  },

  getDesignationById: async (req, res) => {
    const { id } = req.params;
    try {
      const designation = await service.getDesignationById(id);
      res.json(getSuccessResponse(designation));
    } catch (err) {
      getError(err, res);
    }
  },

  updateDesignationById: async (req, res) => {
    try {
      const designationId = req.params.id;
      const designationData = {
        name: req.body.name,
        updatedBy: req.user.user.id,
      };
      await service.updateDesignationById(designationId, designationData);
      res.json(getSuccessResponse({ designationId }));
    } catch (err) {
      getError(err, res);
    }
  },

  deleteDesignationById: async (req, res) => {
    const designationId = req.params.id;
    try {
      await service.deleteDesignationById(designationId);
      res.json(getSuccessResponse({ designationId }));
    } catch (err) {
      getError(err, res);
    }
  },

  createNewDesignation: async (req, res) => {
    try {
      const designationData = {
        name: req.body.name,
        updatedBy: req.user.user.id,
        createdBy: req.user.user.id,
      };
      await service.createNewDesignation(designationData);
      res.json(getSuccessResponse({}));
    } catch (err) {
      getError(err, res);
    }
  },
};
