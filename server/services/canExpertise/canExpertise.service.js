const model = require('./canExpertise.model');

module.exports = {
  getExpertiseById: async (canId) => {
    try {
      const results = await model.getExpertise(canId);
      return results.rows;
    } catch (err) {
      throw err;
    }
  },

  deleteExpertiseById: async (candidateId, expertiseId) => {
    try {
      const expertiseDeleteResultRows = await model.deleteExpertise(candidateId, expertiseId);
      if (expertiseDeleteResultRows <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },

  addExpertiseById: async (candidateId, expertiseArray) => {
    try {
      let totalAddedExpertiseCount = 0;
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < expertiseArray.length; i += 1) {
        const expertiseId = expertiseArray[i];
        const addedExpertiseCount = await model.addExpertise(candidateId, expertiseId);
        if (addedExpertiseCount <= 0) {
          throw (new Error('INVALID_DATA'));
        }
        totalAddedExpertiseCount += 1;
      }
      /* eslint-enable no-await-in-loop */
      if (totalAddedExpertiseCount !== expertiseArray.length) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },
};
