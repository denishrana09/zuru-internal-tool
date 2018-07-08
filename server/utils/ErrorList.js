module.exports = {
    ErrorCodes: {
        'INTERNAL_SERVER_ERROR':{
            httpStatusCode: 500,
            body: {
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Server is not available. Try sometimes Later.',        
            },
        },
        'UNAUTHORIZED': {
            httpStatusCode: 401,
            body: {
                code: 'UNAUTHORIZED',
                message: 'You are not Authorize',
            }
        },
        'INVALID_LOGIN_CREDS': {
            httpStatusCode: 401,
            body: {
                code: 'INVALID_LOGIN_CREDS',
                message: 'Username or password is incorrect. Please check and try again',
            }
        },
        'FORBIDDEN': {
            httpStatusCode: 403,
            body: {
                code: 'FORBIDDEN',
                message: 'Requested Resource could not be Found',
            },
        },
        'JWT_EXPIRE':{
            httpStatusCode: 403,
            body: {
                code: 'JWT_EXPIRE',
                message: 'JWT Token is Expire.'
            }
        },
        'JWT_NOT_PROVIDED': {
            httpStatusCode: 401,
            body: {
                code: 'JWT_NOT_PROVIDED',
                message: 'You are unauthorized. Please provide JWT Token.',
            },
        },
        'INVALID_SIGNATURE': {
            httpStatusCode: 401,
            body: {
                code: 'INVALID_SIGNATURE',
                message: 'Invalid signature in Token',
            },
        },
        'INVALID_TOKEN': {
            httpStatusCode: 403,
            body: {
                code: 'INVALID_TOKEN',
                message: 'Token Request is Invalid. Please try again',
            },
        },
        'JWT_MALFORMED': {
            httpStatusCode: 403,
            body: {
                code: 'JWT_MALFORMED',
                message: 'Please provide Token in well formed',
            },
        },
        'UNAUTHORIZED_EMPLOYEE': {
            httpStatusCode: 401,
            body: {
                code: 'UNAUTHORIZED_EMPLOYEE',
                message: 'you are Unauthorize for Review Status.',
            },
        },
        'NOT_FOUND': {
            httpStatusCode: 404,
            body: {
                code: 'NOT_FOUND',
                message: 'Page is not Found. Please check url.',
            },
        },
        'BAD_REQUEST': {
            httpStatusCode: 400,
            body: {
                code: 'BAD_REQUEST',
                message: 'The server can not process the request due to an apparent client error',
            }
        },
        'VALIDATION_ERROR': {
            httpStatusCode: 400,
            body: {
                code: 'VALIDATION_ERROR',
                message: 'Request data is not valid',
            }
        },
        'UNIQUE_CONSTRAINT_ERROR': {
            body: {
                code: 'UNIQUE_CONSTRAINT_ERROR',
                message: 'seems like entered data is already existed',
            }
        },
        'OK': {
            httpStatusCode: 200,
            body: {
                code: 'OK',
                message: 'Success',
            },
        },
        'INVALID_DATA': {
            httpStatusCode: 400,
            body: {
                code: 'INVALID_DATA',
                message: 'Data is invalid. Please try again',
            },
        },
        'INVALID_MOBILE_NUMBER': { 
            httpStatusCode: 400, 
            body: { 
                code: 'INVALID_MOBILE_NUMBER', 
                message: 'Please Enter valid mobile number', 
            }, 
        },
        'INVALID_NAME': { 
            httpStatusCode: 400, 
            body: { 
                code: 'INVALID_NAME', 
                message: 'Please Enter valid Name', 
            }, 
        },
        'INVALID_EXP': { 
            httpStatusCode: 400, 
            body: { 
                code: 'INVALID_EXP', 
                message: 'Please Enter valid Experience', 
            }, 
        },
    },
};