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
  getExpertise: async (employeeId) => {
    try {
      const empExpData = await client.query(`select "expertise".id,"expertiseField" from "expertise"  
            where id in (select "expertiseId" from "employeeExpertise" where "employeeExpertise"."isDeleted" = 'false' and "employeeId" = ${employeeId})`);
      return empExpData;
    } catch (err) {
      throw err;
    }
  },

  deleteExpertise: async (employeeId, expertiseId) => {
    try {
      const expertiseDeleteResult = await client.query(`update "employeeExpertise" set "isDeleted"='true' where "employeeId" = ${employeeId} and "expertiseId" = ${expertiseId}`);
      return expertiseDeleteResult.rowCount;
    } catch (err) {
      throw err;
    }
  },

  addExpertise: async (employeeId, expertiseId, createdBy, updatedBy) => {
    try {
      const time = new Date().toISOString();
      const expertiseAdded = await client.query(`insert into "employeeExpertise" ("employeeId","expertiseId","createdBy","updatedBy","createdDatetime","updatedDatetime") values
             ('${employeeId}','${expertiseId}','${createdBy}','${updatedBy}','${time}','${time}')`);
      return expertiseAdded.rowCount;
    } catch (err) {
      throw err;
    }
  },
};
