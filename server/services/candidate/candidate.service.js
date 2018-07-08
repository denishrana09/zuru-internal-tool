const model = require('./candidate.model');

module.exports = {
  getAllCandidates: async () => {
    try {
      const allCandidateProfiles = await model.getAllCandidates();
      return allCandidateProfiles;
    } catch (err) {
      throw err;
    }
  },

  getCandidateById: async (candidateId) => {
    try {
      const candidateProfile = await model.getCandidateById(candidateId);
      return candidateProfile;
    } catch (err) {
      throw err;
    }
  },

  deleteCandidate: async (candidateId) => {
    try {
      const deletedCandidateCounts = await model.deleteCandidate(candidateId);

      if (deletedCandidateCounts <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },

  deletePermenantCandidate: async (candidateId) => {
    try {
      const deletedCandidateCounts = await model.deletePermenantCandidate(candidateId);

      if (deletedCandidateCounts <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },

  createNewCandidate: async (requestData) => {
    try {
      const createdCandidateId = await model.createNewCandidate(requestData);
      const { expertiseArray } = requestData;
      const { interviewerArray } = requestData;
      let totalAddedExpertiseCount = 0;
      let totalAddedInterviewsCount = 0;
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < expertiseArray.length; i += 1) {
        const expertiseId = expertiseArray[i];
        const addedExpertiseCount = await model.addExpertise(createdCandidateId, expertiseId,
          requestData.createdBy, requestData.updatedBy);
        if (addedExpertiseCount <= 0) {
          throw (new Error('INVALID_DATA'));
        }
        if (addedExpertiseCount === 1) {
          totalAddedExpertiseCount += 1;
        }
      }
      for (let i = 0; i < interviewerArray.length; i += 1) {
        const interviewerId = interviewerArray[i];
        const addedInterviewsCount = await model.addReview(createdCandidateId, interviewerId,
          requestData.createdBy, requestData.updatedBy);
        if (addedInterviewsCount <= 0) {
          throw (new Error('INVALID_DATA'));
        }
        if (addedInterviewsCount === 1) {
          totalAddedInterviewsCount += 1;
        }
      }
      /* eslint-enable no-await-in-loop */
      if (totalAddedExpertiseCount !== expertiseArray.length) {
        throw (new Error('INVALID_DATA'));
      }
      if (totalAddedInterviewsCount !== interviewerArray.length) {
        throw (new Error('INVALID_DATA'));
      } else {
        return createdCandidateId;
      }
    } catch (err) {
      throw err;
    }
  },

  updateCandidate: async (requestData, candidateId) => {
    try {
      const updatedCandidateCounts = await model.updateCandidate(requestData, candidateId);

      if (updatedCandidateCounts <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },

  createNewReview: async (candidateId, request) => {
    try {
      const createdReviewCounts = await model.addReview(candidateId, request);

      if (createdReviewCounts <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },

  deleteReview: async (candidateId, employeeId) => {
    try {
      const deletedReviewCounts = await model.deleteReview(candidateId, employeeId);

      if (deletedReviewCounts <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },

  getInterviewers: async (candidateId) => {
    try {
      const interviewers = await model.getInterviewers(candidateId);

      if (interviewers.rowCount <= 0) {
        throw (new Error('INVALID_DATA'));
      } else {
        return interviewers.rows;
      }
    } catch (err) {
      throw err;
    }
  },

  scheduleInterview: async (candidateData) => {
    try {
      const scheduleInterviewRowCount = await model.scheduleInterview(candidateData);
      if (scheduleInterviewRowCount.rowCount <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (error) {
      throw error;
    }
  },

  rejectCandidate: async (candidateId) => {
    try {
      const rejectedCandidateRowCount = await model.rejectCandidate(candidateId);
      if (rejectedCandidateRowCount <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (error) {
      throw error;
    }
  },
};
