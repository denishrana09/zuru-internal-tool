const { Client } = require('pg');

require('dotenv-safe').config({
  allowEmptyValues: true,
});

const client = new Client({
  user: process.env.dbUser,
  host: process.env.dbHost,
  database: process.env.dbDatabase,
  port: process.env.dbPort,
});
client.connect();

module.exports = {

  getEmployeeByEmail: async (email) => {
    try {
      const queryParams = [email];
      const employeeDBResult = await client.query('select * from employee where email = $1', queryParams);
      if (employeeDBResult.rowCount !== 1) {
        return null;
      }
      return employeeDBResult.rows[0];
    } catch (err) {
      throw err;
    }
  },

  getAllEmployees: async () => {
    try {
      const employeeDBResult = await client.query(`select employee."id" as "employeeId","firstname","middlename",lastname,
                email,code,mobile,"departmentId","designationId","roleId",birthdate,experience,"pictureUrl",
                employee."createdBy" as "createdBy",employee."updatedBy" as "updatedBy",
                employee."createdDatetime" as "createdDatetime",employee."updatedDatetime" as "updatedDatetime","role",department."name" as "departmentName" ,
                designation."name" as "designationName" from employee
                inner join department on employee."departmentId"= department.id 
                inner join "role" on employee."roleId"=role.id  
                inner join designation on employee."designationId"=designation.id where employee."isDeleted" = 'false';`);

      return employeeDBResult.rows;
    } catch (err) {
      throw err;
    }
  },

  getEmployeeById: async (employeeId) => {
    try {
      const employeeDBResult = await client.query(`select employee."id" as "employeeId","firstname","middlename",lastname,
            email,code,mobile,"departmentId","designationId","roleId",birthdate,experience,"pictureUrl",
            employee."createdBy" as "createdBy",employee."updatedBy" as "updatedBy",
            employee."createdDatetime" as "createdDatetime",employee."updatedDatetime" as "updatedDatetime","role",department."name" as "departmentName" ,
            designation."name" as "designationName" from employee
            inner join department on employee."departmentId"= department.id 
            inner join "role" on employee."roleId"=role.id  
            inner join designation on employee."designationId"=designation.id where employee."isDeleted" = 'false' and public.employee."id" = ${employeeId}`);
      return employeeDBResult.rows[0];
    } catch (err) {
      throw err;
    }
  },

  updateEmployee: async (employeeId, requestData) => {
    try {
      const time = new Date().toISOString();
      const employeeDBResult = await client.query(`UPDATE employee SET (firstname,middlename,lastname,email,code,mobile,
                "departmentId","roleId","designationId",birthdate,experience,"pictureUrl","updatedBy","updatedDatetime") =  
                ('${requestData.firstname}','${requestData.middlename}','${requestData.lastname}','${requestData.email}',
                '${requestData.code}', ${requestData.mobile}, ${requestData.departmentId}, ${requestData.roleId} ,${requestData.designationId} ,
                '${requestData.birthdate}' ,${requestData.experience} ,'${requestData.pictureUrl}','${requestData.updatedBy}','${time}') 
                WHERE id =${employeeId};`);

      return employeeDBResult.rowCount;
    } catch (err) {
      throw err;
    }
  },

  deleteEmployee: async (employeeId) => {
    try {
      await client.query(`update "employeeExpertise" set "isDeleted" = 'true' where "employeeId" = ${employeeId};`);
      const employeeDBResult = await client.query(`update employee set "isDeleted" = 'true' where id = ${employeeId};`);
      return employeeDBResult.rowCount;
    } catch (err) {
      throw err;
    }
  },

  createNewEmployee: async (userData, hashPassword) => {
    try {
      const time = new Date().toISOString();
      await client.query(`INSERT INTO employee (firstname,middlename,lastname,password,email,code,mobile,"departmentId", 
            "roleId","designationId","createdBy","updatedBy","createdDatetime","updatedDatetime") VALUES  
            ('${userData.firstname}','${userData.middlename}','${userData.lastname}','${hashPassword}','${userData.email}','${userData.code}', ${userData.mobile},
            ${userData.deptId}, ${userData.roleId} ,${userData.designationId}, '${userData.createdBy}', '${userData.updatedBy}','${time}','${time}');`);

      const mEmployee = await client.query(`select employee."id" from employee where email = '${userData.email}'`);
      return mEmployee.rows;
    } catch (err) {
      throw err;
    }
  },

  updateReviewStatus: async (status, remarks, employeeId, candidateId, updatedBy) => {
    try {
      const validateEmployee = await client.query(`select "candidateId", "employeeId" from "profileReview" where "employeeId" = ${employeeId}
       and "candidateId" = ${candidateId};`);
      if (validateEmployee.rowCount > 0) {
        const time = new Date().toISOString();

        try {
          const reviewDBResult = await client.query(`update "profileReview" set status= '${status}', "updatedBy"= '${updatedBy}', "updatedDatetime"= '${time}'  ,
          "remarks"='${remarks}'
                    where "employeeId"=${employeeId} and "candidateId"=${candidateId}`);
          return reviewDBResult.rowCount;
        } catch (err) {
          throw err;
        }
      } else {
        const err = new Error('UNAUTHORIZED_EMPLOYEE');
        throw err;
      }
    } catch (err) {
      throw err;
    }
  },

  getCandidateByEmployeeId: async (employeeId) => {
    try {
      const candidateProfile = await client.query(`select candidate.id, candidate.firstname,candidate.lastname,designation."name",candidate.email,
      candidate.mobile, candidate."designationId",candidate."referrerName", candidate."pictureUrl",
      candidate.experience, candidate."currentEmployer", candidate."resumeUrl", candidate."interviewDatetime", candidate."profileReviewStatus"
      from "profileReview" inner join candidate on candidate.id = "profileReview"."candidateId" 
      inner join designation on candidate."designationId" = designation.id where "employeeId" = '${employeeId}';`);
      return candidateProfile.rows;
    } catch (err) {
      throw err;
    }
  },
};
