const bcrypt = require('bcrypt');
const Employee = require('../employee/employee.model');
const JWT = require('../../utils/jwt');


module.exports = {
  login: async (userData) => {
    try {
      const userProfile = await Employee.getEmployeeByEmail(userData.email);
      if (userProfile == null) throw (new Error('INVALID_LOGIN_CREDS'));

      const matchPassword = await bcrypt.compare(userData.password, userProfile.password);

      if (matchPassword) {
        delete userProfile.password;
        const token = await JWT.generateJWT({ user: userProfile });
        return {
          token,
          profile: userProfile,
        };
      }
      throw (new Error('INVALID_LOGIN_CREDS'));
    } catch (err) {
      throw err;
    }
  },
};
