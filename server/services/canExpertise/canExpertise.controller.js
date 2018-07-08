const service = require('./canExpertise.service');
const { getSuccessResponse, getErrorResponse } = require('../../middleware/ResponseGenerator');

const getError = (err, res) => {
  const errorResponse = getErrorResponse(err);
  res.status(errorResponse.httpStatusCode).json(errorResponse.body);
};

module.exports = {
  getExpertiseByCandidateId: async (req, res) => {
    const canId = req.params.id;
    try {
      const expertise = await service.getExpertiseById(canId);
      res.json(getSuccessResponse(expertise));
    } catch (err) {
      getError(err, res);
    }
  },

  deleteExpertiseByCandidateId: async (req, res) => {
    try {
      const candidateId = req.params.id;
      const { expertiseId } = req.body;
      try {
        await service.deleteExpertiseById(candidateId, expertiseId);
        res.json(getSuccessResponse({}));
      } catch (err) {
        getError(err, res);
      }
    } catch (err) {
      getError(err, res);
    }
  },

  addExpertiseByCandidateId: async (req, res) => {
    try {
      const candidateId = req.params.id;
      const { expertiseArray } = req.body;
      await service.addExpertiseById(candidateId, expertiseArray,
        req.user.user.id, req.user.user.id);
      res.json(getSuccessResponse({}));
    } catch (err) {
      getError(err, res);
    }
  },
};
