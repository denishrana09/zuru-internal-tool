const Model = require('./designation.model');

module.exports = {
  getAllDesignation: async () => {
    try {
      const allDesignation = await Model.getAllDesignation();
      return allDesignation;
    } catch (err) {
      throw err;
    }
  },

  getDesignationById: async (designationId) => {
    try {
      const designation = await Model.getDesignationById(designationId);
      return designation;
    } catch (err) {
      throw err;
    }
  },

  updateDesignationById: async (designationId, designationData) => {
    try {
      const updateDesignationCounts = await Model.updateDesignationById(designationId,
        designationData);
      if (updateDesignationCounts <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },

  deleteDesignationById: async (designationId) => {
    try {
      const deleteDesignationCounts = await Model.deleteDesignationById(designationId);
      if (deleteDesignationCounts <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },

  createNewDesignation: async (designationData) => {
    try {
      const createDesignationCounts = await Model.createNewDesignation(designationData);
      if (createDesignationCounts <= 0) {
        throw (new Error('INVALID_DATA'));
      }
    } catch (err) {
      throw err;
    }
  },
};
