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
  getEmpId: async (candidateId) => {
    try {
      const empId = await client.query(`select "employeeId" from "profileReview"  where "candidateId" = ${candidateId}`);
      return empId;
    } catch (err) {
      throw err;
    }
  },

  getEmpEmail: async (empId) => {
    try {
      const empData = await client.query(`select email, firstname from employee where id = ${empId}`);
      return empData;
    } catch (err) {
      throw err;
    }
  },

  setRefToken: async (empId, token) => {
    try {
      const empData = await client.query(`update employee set "refreshToken" = '${token}' where id=${empId}`);
      return empData;
    } catch (err) {
      throw err;
    }
  },

  getRefToken: async (empId) => {
    try {
      const empData = await client.query(`select "refreshToken" from employee where id=${empId}`);
      return empData.rows[0].refreshToken;
    } catch (err) {
      throw err;
    }
  },
};
