const express = require('express');
const validation = require('express-validation');

const router = express.Router();

const verifyToken = require('../../middleware/VerifyToken');
const controller = require('./candidate.controller');
const candidateValidation = require('./candidate.validation');

router.route('/')
  .get(verifyToken, controller.getAllCandidates);

router.route('/:id')
  .get(verifyToken, controller.getCandidateById)
  .delete(verifyToken, controller.deleteCandidate)
  .delete(verifyToken, controller.deletePermenantCandidate)
  .put(validation(candidateValidation.updateCandidate), verifyToken, controller.updateCandidate);

router.route('/')
  .post(validation(candidateValidation.addCandidate), verifyToken, controller.createNewCandidate);

router.route('/:candidateId/review')
  .post(validation(candidateValidation.addReview), verifyToken, controller.createNewReview);

router.route('/:candidateId/employee/:employeeId/review')
  .delete(verifyToken, controller.deleteReview);

router.route('/interviewer/:id')
  .get(verifyToken, controller.getInterviewersByCandidateId);

router.route('/schedule/:id')
  .put(validation(candidateValidation.schedule), verifyToken, controller.scheduleInterview);

router.route('/reject/:id')
  .put(verifyToken, controller.rejectCandidate);

module.exports = router;
