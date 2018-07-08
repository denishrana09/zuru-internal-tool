const model = require('./role.model');

module.exports = {
  getAllRoles: async () => {
    try {
      const allRoles = await model.getAllRoles();
      return allRoles;
    } catch (err) {
      throw err;
    }
  },

  getRoleById: async (roleId) => {
    try {
      const role = await model.getRoleById(roleId);
      return role;
    } catch (err) {
      throw err;
    }
  },

  updateRoleById: async (roleId, roleData) => {
    try {
      const updatedRoleCounts = await model.updateRoleById(roleId, roleData);
      if (updatedRoleCounts <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },

  deleteRoleById: async (roleId) => {
    try {
      const deletedRoleCounts = await model.deleteRoleById(roleId);
      if (deletedRoleCounts <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },

  createNewRole: async (roleData) => {
    try {
      const createdRoleCounts = await model.createNewRole(roleData);
      if (createdRoleCounts <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },
};
