const service = require('./expertise.service');
const { getSuccessResponse, getErrorResponse } = require('../../middleware/ResponseGenerator');

const getError = (err, res) => {
  const errorResponse = getErrorResponse(err);
  res.status(errorResponse.httpStatusCode).json(errorResponse.body);
};

module.exports = {
  getAllExpertises: async (req, res) => {
    try {
      const allExpertises = await service.getAllExpertises();
      res.json(getSuccessResponse(allExpertises));
    } catch (err) {
      getError(err, res);
    }
  },

  getExpertiseById: async (req, res) => {
    const expertiseId = req.params.id;
    try {
      const expertise = await service.getExpertiseById(expertiseId);
      res.json(getSuccessResponse(expertise));
    } catch (err) {
      getError(err, res);
    }
  },

  updateExpertiseById: async (req, res) => {
    const expertiseId = req.params.id;
    try {
      const expertiseData = {
        expertiseField: req.body.expertiseField,
        updatedBy: req.user.user.id,
      };
      await service.updateExpertiseById(expertiseId, expertiseData);
      res.json(getSuccessResponse({ expertiseId }));
    } catch (err) {
      getError(err, res);
    }
  },

  deleteExpertiseById: async (req, res) => {
    const expertiseId = req.params.id;
    try {
      await service.deleteExpertiseById(expertiseId);

      res.json(getSuccessResponse({ expertiseId }));
    } catch (err) {
      getError(err, res);
    }
  },

  createNewExpertise: async (req, res) => {
    try {
      const expertiseData = {
        expertiseField: req.body.expertiseField,
        updatedBy: req.user.user.id,
        createdBy: req.user.user.id,
      };
      await service.createNewExpertise(expertiseData);
      res.json(getSuccessResponse({}));
    } catch (err) {
      getError(err, res);
    }
  },
};
