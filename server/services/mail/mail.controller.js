const service = require('./mail.service');
const { getSuccessResponse, getErrorResponse } = require('../../middleware/ResponseGenerator');

const getError = (err, res) => {
  const errorResponse = getErrorResponse(err);
  res.status(errorResponse.httpStatusCode).json(errorResponse.body);
};

module.exports = {

  setEvent: async (req, res, next) => {
    if (req.body.profileReviewStatus === 'accepted') {
      try {
        if (!req.body.email || !req.body.interviewDatetime || !req.body.firstname
                || !req.body.lastname || !req.body.id || !req.body.resumeUrl) {
          next(new Error('BAD_REQUEST'));
        } else {
          try {
            const myDetails = {
              id: req.body.id,
              email: req.body.email,
              interviewDatetime: req.body.interviewDatetime,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              resumeUrl: req.body.resumeUrl,
              designation: req.body.designation,
            };
            const mail = await service.setCalEvent(myDetails);
            res.json(getSuccessResponse(mail));
          } catch (err) {
            getError(err, res);
          }
        }
      } catch (err) {
        getError(err, res);
      }
    }
  },

  getUrl: async (req, res) => {
    try {
      const url = await service.getURL();
      res.json(getSuccessResponse(url));
    } catch (err) {
      getError(err, res);
    }
  },

  getToken: async (req, res, next) => {
    try {
      if (!req.params.id || !req.body.code) {
        next(new Error('BAD_REQUEST'));
      } else {
        const myDetails = {
          id: req.params.id,
          code: req.body.code,
        };
        try {
          const token = await service.getRefToken(myDetails);
          res.json(getSuccessResponse(token));
        } catch (err) {
          getError(err, res);
        }
      }
    } catch (err) {
      getError(err, res);
    }
  },
};
