const model = require('./expertise.model');

module.exports = {
  getAllExpertises: async () => {
    try {
      const allExpertise = await model.getAllExpertises();
      return allExpertise;
    } catch (err) {
      throw err;
    }
  },

  getExpertiseById: async (expertiseId) => {
    try {
      const expertise = await model.getExpertiseById(expertiseId);
      return expertise;
    } catch (err) {
      throw err;
    }
  },

  updateExpertiseById: async (expertiseId, expertiseData) => {
    try {
      const updatedExpertiseCounts = await model.updateExpertiseById(expertiseId, expertiseData);

      if (updatedExpertiseCounts <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },

  deleteExpertiseById: async (expertiseId) => {
    try {
      const deleteExpertiseCounts = await model.deleteExpertiseById(expertiseId);

      if (deleteExpertiseCounts <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },

  createNewExpertise: async (expertiseData) => {
    try {
      const createExpertiseCounts = await model.createNewExpertise(expertiseData);

      if (createExpertiseCounts <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },
};
