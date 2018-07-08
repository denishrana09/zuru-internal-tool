const Department = require('./department.model');

module.exports = {
  getAllDepartment: async () => {
    try {
      const allDepartment = await Department.getAllDepartment();
      return allDepartment;
    } catch (err) {
      throw err;
    }
  },

  getDepartmentById: async (departmentId) => {
    try {
      const department = await Department.getDepartmentById(departmentId);
      return department;
    } catch (err) {
      throw err;
    }
  },

  updateDepartmentById: async (departmentId, departmentData) => {
    try {
      const updatedDepartmentCounts = await Department.updateDepartmentById(departmentId,
        departmentData);
      if (updatedDepartmentCounts <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },

  deleteDepartmentById: async (departmentId) => {
    try {
      const deletedDepartmentCounts = await Department.deleteDepartmentById(departmentId);
      if (deletedDepartmentCounts <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },

  createNewDepartment: async (departmentData) => {
    try {
      const createdDepartmentCounts = await Department.createNewDepartment(departmentData);
      if (createdDepartmentCounts <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },
};
