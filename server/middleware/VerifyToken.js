const jwt = require('jsonwebtoken');
require('dotenv-safe').config();

module.exports = function (req, res, next) {
    if (req.headers['authorization'] !== 'undefine') {
        try {
            jwt.verify(req.headers['authorization'], process.env.secretKey, (err, originalData) => {
                if (err) {
                    throw err;
                } else {
                    req.user = originalData;
                    next()
                }
            });
        } catch (err) {
            throw err;
        }
    } else {
        throw err;
    }
};