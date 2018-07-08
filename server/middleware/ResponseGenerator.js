const validate = require('express-validation');
const { ErrorCodes } = require('../utils/ErrorList');

module.exports = {
    getErrorResponse: (err, req, Raven) => {
        if (err instanceof validate.ValidationError) {
            return module.exports.ValidationError(err);
        }
        console.error(err);
        if (err) {
            if(!err.name === "TokenExpiredError" || !err.name === "JsonWebTokenError"){
                Raven.captureException(err, { req: req });
            }
        }
        return module.exports.generateErrorResponse(err.message);
    },

    generateErrorResponse: (code) => {
        return ErrorCodes[code] || ErrorCodes.INTERNAL_SERVER_ERROR;
    },

    ValidationError: (err) => {
        const errorResponse = module.exports.generateErrorResponse('VALIDATION_ERROR');
        errorResponse.body.data = module.exports.validateErrorGenerator(err);
        return errorResponse;
    },
    
    validateErrorGenerator: (err) => {
        const data = err.errors.map(error => {
            return {
                location: error.location,
                messages: error.messages[0]
            };
        })
        return data;
    },

    getSuccessResponse: (payload) => {
        const data = {
            status: true,
            data: payload
        };
        return data;
    }
};