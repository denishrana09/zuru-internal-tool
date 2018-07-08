const service = require('./candidate.service');
const { getSuccessResponse } = require('../../middleware/ResponseGenerator');

const IndNum = /^[0]?[789]\d{9}$/;
const validStr = /^[a-zA-Z]{1,30}$/;
const validNumber = /^[0-9][.]?[0-9]?$/;

module.exports = {
  getAllCandidates: async (req, res, next) => {
    try {
      const allCandidatesProfile = await service.getAllCandidates();
      res.json(getSuccessResponse(allCandidatesProfile));
    } catch (err) {
      next(err);
    }
  },

  getCandidateById: async (req, res, next) => {
    try {
      const candidateId = req.params.id;
      const candidatesProfile = await service.getCandidateById(candidateId);

      res.json(getSuccessResponse(candidatesProfile));
    } catch (err) {
      next(err);
    }
  },

  deleteCandidate: async (req, res, next) => {
    try {
      const candidateId = req.params.id;
      await service.deleteCandidate(candidateId);

      res.json(getSuccessResponse({ candidateId }));
    } catch (err) {
      next(err);
    }
  },

  deletePermenantCandidate: async (req, res, next) => {
    try {
      const candidateId = req.params.id;
      await service.deleteCandidate(candidateId);

      res.json(getSuccessResponse({ candidateId }));
    } catch (err) {
      next(err);
    }
  },

  createNewCandidate: async (req, res, next) => {
    const mobileNumber = req.body.mobile;
    if (!IndNum.test(mobileNumber)) {
      next(new Error('INVALID_MOBILE_NUMBER'));
    } else if (!validStr.test(req.body.firstname) || !validStr.test(req.body.lastname)
    || !validStr.test(req.body.middlename)) {
      next(new Error('INVALID_NAME'));
    } else if (!validNumber.test(req.body.experience)) {
      next(new Error('INVALID_EXP'));
    } else {
      const requestData = {
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        email: req.body.email,
        mobile: req.body.mobile,
        designationId: req.body.designationId,
        experience: req.body.experience,
        pictureUrl: req.body.pictureUrl,
        resumeUrl: req.body.resumeUrl,
        referrerName: req.body.referrerName,
        currentEmployer: req.body.currentEmployer,
        expertiseArray: req.body.expertiseArray,
        interviewerArray: req.body.interviewerArray,
        updatedBy: req.user.user.id,
        createdBy: req.user.user.id,
      };
      try {
        const createdCandidateId = await service.createNewCandidate(requestData);
        res.json(getSuccessResponse({ candidateId: createdCandidateId }));
      } catch (err) {
        next(err);
      }
    }
  },

  updateCandidate: async (req, res, next) => {
    try {
      const mobileNumber = req.body.mobile;
      if (!IndNum.test(mobileNumber)) {
        next(new Error('INVALID_MOBILE_NUMBER'));
      } else if (!validStr.test(req.body.firstname) || !validStr.test(req.body.lastname)
      || !validStr.test(req.body.middlename)) {
        next(new Error('INVALID_NAME'));
      } else if (!validNumber.test(req.body.experience)) {
        next(new Error('INVALID_EXP'));
      } else {
        const candidateId = req.params.id;
        const data = {
          firstname: req.body.firstname,
          middlename: req.body.middlename,
          lastname: req.body.lastname,
          email: req.body.email,
          mobile: req.body.mobile,
          designationId: req.body.designationId,
          experience: req.body.experience,
          pictureUrl: req.body.pictureUrl,
          resumeUrl: req.body.resumeUrl,
          referrerName: req.body.referrerName,
          currentEmployer: req.body.currentEmployer,
          updatedBy: req.user.user.id,
        };

        await service.updateCandidate(data, candidateId);

        res.json(getSuccessResponse({ candidateId }));
      }
    } catch (err) {
      next(err);
    }
  },

  createNewReview: async (req, res, next) => {
    try {
      const { candidateId } = req.params;
      const reviewData = {
        employeeId: req.body.employeeId,
        updatedBy: req.user.user.id,
        createdBy: req.user.user.id,
      };
      await service.createNewReview(candidateId, reviewData);

      res.json(getSuccessResponse({}));
    } catch (err) {
      next(err);
    }
  },

  deleteReview: async (req, res, next) => {
    try {
      const { candidateId } = req.params;
      const { employeeId } = req.params;

      await service.deleteReview(candidateId, employeeId);

      res.json(getSuccessResponse({ candidateId, employeeId }));
    } catch (err) {
      next(err);
    }
  },

  getInterviewersByCandidateId: async (req, res, next) => {
    const canId = req.params.id;
    try {
      const interviewers = await service.getInterviewers(canId);
      res.json(getSuccessResponse(interviewers));
    } catch (err) {
      next(err);
    }
  },

  scheduleInterview: async (req, res, next) => {
    try {
      const candidateData = {
        candidateId: req.params.id,
        profileReviewStatus: req.body.profileReviewStatus,
        interviewDatetime: req.body.interviewDatetime,
        updatedBy: req.user.user.id,
      };
      await service.scheduleInterview(candidateData);
      res.json(getSuccessResponse({}));
    } catch (err) {
      next(err);
    }
  },

  rejectCandidate: async (req, res, next) => {
    try {
      const candidateId = req.params.id;
      await service.rejectCandidate(candidateId);
      res.json(getSuccessResponse());
    } catch (err) {
      next(err);
    }
  },
};
