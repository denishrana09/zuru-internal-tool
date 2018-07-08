const { Client } = require('pg');
require('dotenv-safe').config({
  allowEmptyValues: true,
});
const config = require('../../config.json');

const client = new Client({
  user: process.env.dbUser,
  host: process.env.dbHost,
  database: process.env.dbDatabase,
  port: process.env.dbPort,
});
client.connect();

module.exports = {
  getAllCandidates: async () => {
    try {
      const allCandidates = await client.query(`select c.id as "candidateId", c.firstname, c.middlename, c.lastname , 
            c.email, c.mobile, c."designationId",d.name as "designationName", c."referrerName", c."pictureUrl",
            c.experience, c."currentEmployer", c."resumeUrl", c."interviewDatetime", c."profileReviewStatus", c."createdBy", 
            c."updatedBy", c."createdDatetime", c."updatedDatetime" from candidate c inner join designation d on c."designationId"=d.id where c."isDeleted" = 'false';`);
      return allCandidates.rows;
    } catch (err) {
      throw err;
    }
  },

  getInterviewers: async (candidateId) => {
    try {
      const candidateProfileReviewDetails = await client.query(`select "employeeId",firstname,lastname,status,remarks from employee
             inner join "profileReview" on employee.id = "profileReview"."employeeId" where "candidateId"=${candidateId};`);
      return candidateProfileReviewDetails;
    } catch (err) {
      throw err;
    }
  },

  getCandidateById: async (candidateId) => {
    try {
      const candidateProfile = await client.query(`select c.id as "candidateId", c.firstname, c.middlename, c.lastname , 
            c.email, c.mobile, c."designationId",d.name as "designationName", c."referrerName", c."pictureUrl",
            c.experience, c."currentEmployer", c."resumeUrl", c."interviewDatetime", c."profileReviewStatus", c."createdBy", 
            c."updatedBy", c."createdDatetime", c."updatedDatetime" from candidate c inner join designation d on c."designationId"=d.id  
            where c.id = ${candidateId} and c."isDeleted" = 'false';`);
      return candidateProfile.rows[0];
    } catch (err) {
      throw err;
    }
  },

  deleteCandidate: async (candidateId) => {
    try {
      await client.query(`update "profileReview" set "isDeleted"='true' where "candidateId" = ${candidateId}`);
      await client.query(`update "candidateExpertise" set "isDeleted"='true' where "candidateId"= ${candidateId}`);
      const deletedCandidate = await client.query(`update candidate set "isDeleted"='true' where id = ${candidateId}; `);

      return deletedCandidate.rowCount;
    } catch (err) {
      throw err;
    }
  },

  deletePermenantCandidate: async (candidateId) => {
    try {
      await client.query(`delete from "profileReview" where "candidateId" = ${candidateId}`);
      await client.query(`delete from "candidateExpertise" where "candidateId"= ${candidateId}`);
      const deletedCandidate = await client.query(`delete from candidate where id = ${candidateId}; `);
      return deletedCandidate.rowCount;
    } catch (err) {
      throw err;
    }
  },

  createNewCandidate: async (request) => {
    try {
      const time = new Date().toISOString();
      await client.query(`INSERT INTO candidate (firstname,middlename,lastname,email,mobile, 
                "designationId",experience,"pictureUrl","resumeUrl","referrerName","currentEmployer"
                ,"createdBy","updatedBy","createdDatetime","updatedDatetime") VALUES  
            ('${request.firstname}','${request.middlename}','${request.lastname}','${request.email}', ${request.mobile},${request.designationId} ,
            ${request.experience} ,'${request.pictureUrl}','${request.resumeUrl}' ,'${request.referrerName}','${request.currentEmployer}',
             '${request.createdBy}','${request.updatedBy}', '${time}','${time}');`);

      const candidateId = await client.query(`select candidate."id" from candidate where email = '${request.email}'`);
      return candidateId.rows[0].id;
    } catch (err) {
      throw err;
    }
  },

  updateCandidate: async (candidateData, candidateId) => {
    try {
      const time = new Date().toISOString();
      const updatedCandidate = await client.query(`UPDATE candidate SET (firstname, middlename, lastname, email, mobile, "designationId","referrerName","pictureUrl",
            experience, "currentEmployer", "resumeUrl","updatedBy", "updatedDatetime")=('${candidateData.firstname}', '${candidateData.middlename}', 
            '${candidateData.lastname}', '${candidateData.email}', ${candidateData.mobile}, ${candidateData.designationId}, '${candidateData.referrerName}',
            '${candidateData.pictureUrl}', ${candidateData.experience}, '${candidateData.currentEmployer}', '${candidateData.resumeUrl}'
            ,'${candidateData.updatedBy}','${time}') where id = ${candidateId};`);

      return updatedCandidate.rowCount;
    } catch (err) {
      throw err;
    }
  },

  scheduleInterview: async (candidateData) => {
    try {
      const time = new Date().toISOString();
      const scheduledInterview = await client.query(`update candidate set ("interviewDatetime","profileReviewStatus","updatedBy", "updatedDatetime") = 
            ('${candidateData.interviewDatetime}','${candidateData.profileReviewStatus}','${candidateData.updatedBy}','${time}') where id = ${candidateData.candidateId};`);
      return scheduledInterview;
    } catch (error) {
      throw error;
    }
  },

  addReview: async (candidateId, employeeId, createdBy, updatedBy) => {
    try {
      const time = new Date().toISOString();
      const profileReviewStatus = config.PROFILE_REVIEW_STATUS.PENDING;
      const createdReview = await client.query(`insert into "profileReview" ("candidateId","employeeId",status,"createdBy","updatedBy","createdDatetime","updatedDatetime")
            values (${candidateId},${employeeId},'${profileReviewStatus}','${createdBy}','${updatedBy}','${time}','${time}')`);

      return createdReview.rowCount;
    } catch (err) {
      throw err;
    }
  },

  deleteReview: async (candidateId, employeeId) => {
    try {
      const deletedReview = await client.query(`update "profileReview" set "isDeleted" = 'true' where "candidateId" = ${candidateId} and "employeeId" = ${employeeId}`);
      return deletedReview.rowCount;
    } catch (err) {
      throw err;
    }
  },

  addExpertise: async (candidateId, expertiseId, createdBy, updatedBy) => {
    try {
      const time = new Date().toISOString();
      const insertedExpertiseCount = await client.query(`insert into "candidateExpertise" 
            ("candidateId","expertiseId","createdBy","updatedBy","createdDatetime","updatedDatetime")
            values ('${candidateId}','${expertiseId}','${createdBy}','${updatedBy}','${time}','${time}')`);

      return insertedExpertiseCount.rowCount;
    } catch (err) {
      throw err;
    }
  },

  rejectCandidate: async (candidateId) => {
    try {
      const status = config.PROFILE_REVIEW_STATUS.REJECTED;
      const rejectedCandidateResult = await client.query(`update "candidate" set "profileReviewStatus" = ('${status}') where "id" = ${candidateId}`);
      return rejectedCandidateResult.rowCount;
    } catch (err) {
      throw err;
    }
  },
};
