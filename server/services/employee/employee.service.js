const bcrypt = require('bcrypt');
const model = require('./employee.model');

require('dotenv-safe').config({
  allowEmptyValues: true,
});

module.exports = {
  getAllEmployees: async () => {
    try {
      const allEmployeeProfile = await model.getAllEmployees();
      return allEmployeeProfile;
    } catch (err) {
      throw err;
    }
  },

  getEmployeeById: async (employeeId) => {
    try {
      const employeeProfile = await model.getEmployeeById(employeeId);
      return employeeProfile;
    } catch (err) {
      throw err;
    }
  },

  updateEmployeeById: async (employeeId, requestData) => {
    try {
      const updatedEmployeeCounts = await model.updateEmployee(employeeId, requestData);

      if (updatedEmployeeCounts <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },

  deleteEmployeeById: async (employeeId) => {
    try {
      const deletedEmployeeCounts = await model.deleteEmployee(employeeId);

      if (deletedEmployeeCounts <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },

  createNewEmployee: async (requestData) => {
    try {
      const hashPassword = await bcrypt.hash(requestData.password,
        parseInt(process.env.saltRounds, 10));
      const createdEmployee = await model.createNewEmployee(requestData, hashPassword);

      if (createdEmployee.length <= 0) {
        throw (new Error('INVALID_DATA'));
      }
      return createdEmployee[0].id;
    } catch (err) {
      throw err;
    }
  },

  updateReviewStatus: async (status, remarks, employeeId, candidateId, updatedBy) => {
    try {
      const updatedReviewStatusCounts = await model.updateReviewStatus(status, remarks,
        employeeId, candidateId, updatedBy);

      if (updatedReviewStatusCounts <= 0) {
        throw (new Error('INVALID_ERROR'));
      }
    } catch (err) {
      throw err;
    }
  },

  getCandidateByEmployeeId: async (employeeId) => {
    try {
      const candidatesProfileResult = await model.getCandidateByEmployeeId(employeeId);
      return candidatesProfileResult;
    } catch (err) {
      throw err;
    }
  },

};
