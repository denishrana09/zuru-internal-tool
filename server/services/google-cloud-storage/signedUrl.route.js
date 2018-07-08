const express = require('express');
const VerifyToken = require('../../middleware/VerifyToken');
const signedUrlHelper = require('./signedUrlHelper');

const router = express.Router();

router.route('/picture')
    .post(VerifyToken, signedUrlHelper.getPictureUrls);

router.route('/resume')
    .post(VerifyToken, signedUrlHelper.getResumeUrls)

module.exports = router;