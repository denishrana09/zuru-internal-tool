const model = require('./empExpertise.model');

module.exports = {
  getExpertiseById: async (empId) => {
    try {
      const results = await model.getExpertise(empId);
      return results.rows;
    } catch (err) {
      throw err;
    }
  },

  deleteExpertiseById: async (employeeId, expertiseId) => {
    try {
      const expertiseDeleteResultRows = await model.deleteExpertise(employeeId, expertiseId);
      if (expertiseDeleteResultRows <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },

  addExpertiseById: async (employeeId, expertiseArray) => {
    try {
      let totalAddedExpertiseCount = 0;
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < expertiseArray.length; i += 1) {
        const expertiseId = expertiseArray[i];
        const addedExpertiseCount = await model.addExpertise(employeeId, expertiseId);
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
