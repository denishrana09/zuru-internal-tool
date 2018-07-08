const service = require('./employee.service');
const { getSuccessResponse, getErrorResponse } = require('../../middleware/ResponseGenerator');

const IndNum = /^[0]?[789]\d{9}$/;
const validStr = /^[a-zA-Z]{2,30}$/;
const validNumber = /^[0-9][.]?[0-9]?$/;

const getError = (err, res) => {
  const errorResponse = getErrorResponse(err);
  res.status(errorResponse.httpStatusCode).json(errorResponse.body);
};

module.exports = {
  getAllEmployees: async (req, res) => {
    try {
      const allEmployeesProfile = await service.getAllEmployees();
      res.json(getSuccessResponse(allEmployeesProfile));
    } catch (err) {
      getError(err, res);
    }
  },

  getEmployeeById: async (req, res) => {
    try {
      const employeeId = req.params.id;
      const employeeProfile = await service.getEmployeeById(employeeId);
      res.json(getSuccessResponse(employeeProfile));
    } catch (err) {
      getError(err, res);
    }
  },

  updateEmployee: async (req, res, next) => {
    const mobileNumber = req.body.mobile;
    if (!IndNum.test(mobileNumber)) {
      next(new Error('INVALID_MOBILE_NUMBER'));
    } else if (!validStr.test(req.body.firstname) || !validStr.test(req.body.lastname)) {
      next(new Error('INVALID_NAME'));
    } else if (!validNumber.test(req.body.experience)) {
      next(new Error('INVALID_EXP'));
    } else {
      const employeeId = req.params.id;
      const employeeData = {
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        email: req.body.email,
        code: req.body.code,
        mobile: req.body.mobile,
        departmentId: req.body.departmentId,
        roleId: req.body.roleId,
        designationId: req.body.designationId,
        birthdate: req.body.birthdate,
        experience: req.body.experience,
        pictureUrl: req.body.pictureUrl,
        updatedBy: req.user.user.id,
      };
      try {
        await service.updateEmployeeById(employeeId, employeeData);
        res.json(getSuccessResponse({ employeeId }));
      } catch (err) {
        next(new Error('UNIQUE_CONSTRAINT_ERROR'));
      }
    }
  },

  deleteEmployee: async (req, res) => {
    try {
      const employeeId = req.params.id;
      await service.deleteEmployeeById(employeeId);
      res.json(getSuccessResponse({ employeeId }));
    } catch (err) {
      getError(err, res);
    }
  },

  createNewEmployee: async (req, res, next) => {
    try {
      const mobileNumber = req.body.mobile;
      if (!IndNum.test(mobileNumber)) {
        next(new Error('INVALID_MOBILE_NUMBER'));
      } else if (!validStr.test(req.body.firstname) || !validStr.test(req.body.lastname)) {
        next(new Error('INVALID_NAME'));
      } else {
        const requestData = {
          firstname: req.body.firstname,
          middlename: req.body.middlename,
          lastname: req.body.lastname,
          password: req.body.password,
          email: req.body.email,
          code: req.body.code,
          mobile: req.body.mobile,
          deptId: req.body.departmentId,
          roleId: req.body.roleId,
          designationId: req.body.designationId,
          // Birthdate,Experience and PictureFile will be updated by Employee
          createdBy: req.user.user.id,
          updatedBy: req.user.user.id,
        };
        try {
          const createdEmployeeId = await service.createNewEmployee(requestData);
          res.json(getSuccessResponse({ employeeId: createdEmployeeId }));
        } catch (err) {
          next(new Error('UNIQUE_CONSTRAINT_ERROR'));
        }
      }
    } catch (err) {
      getError(err, res);
    }
  },

  updateReviewStatus: async (req, res, next) => {
    try {
      const { candidateId } = req.params;
      const { employeeId } = req.params;
      const updatedBy = req.user.user.id;
      const { status } = req.body;
      const { remarks } = req.body;
      console.log(status, remarks)
      await service.updateReviewStatus(status, remarks, employeeId, candidateId, updatedBy);
      res.json(getSuccessResponse({ candidateId, employeeId }));
    } catch (err) {
      next(err);
    }
  },

  getCandidateByEmployeeId: async (req, res, next) => {
    try {
      const { employeeId } = req.params;
      const candidatesProfileResult = await service.getCandidateByEmployeeId(employeeId);
      res.json(getSuccessResponse({ candidatesProfileResult }));
    } catch (err) {
      next(err);
    }
  },

};
