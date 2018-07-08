const express = require('express');
const validation = require('express-validation');

const router = express.Router();

const tokenVerification = require('../../middleware/VerifyToken');
const controller = require('./canExpertise.controller');
const candidateExpertiseValidation = require('./canExpertise.validation');

router.route('/:id')
  .get(tokenVerification, controller.getExpertiseByCandidateId)
  .delete(tokenVerification, validation(candidateExpertiseValidation.deleteCandidateExpertise),
    controller.deleteExpertiseByCandidateId)
  .post(tokenVerification, validation(candidateExpertiseValidation.addCandidateExpertise),
    controller.addExpertiseByCandidateId);

module.exports = router;
