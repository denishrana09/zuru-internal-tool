const jwt = require('jsonwebtoken');

// const secret = process.env.JWT_SECRET;

module.exports = {
    generateJWT: async (payload) => {
        try {
            const token = jwt.sign(payload, process.env.secretKey,
                { expiresIn: parseInt(process.env.jwtExpireTime, 10) });
            return token;
        } catch (error) {
            throw error;
        }
    },
};
