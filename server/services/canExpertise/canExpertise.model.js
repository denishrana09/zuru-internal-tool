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
  getExpertise: async (candidateId) => {
    try {
      const canExpData = await client.query(`select "expertise".id,"expertiseField" from "expertise" where id 
        in (select "expertiseId" from "candidateExpertise" where "candidateId" = ${candidateId} and "isDeleted"='false')`);
      return canExpData;
    } catch (err) {
      throw err;
    }
  },

  deleteExpertise: async (candidateId, expertiseId) => {
    try {
      const expertiseDeleteResult = await client.query(`update "candidateExpertise" set "isDeleted"='true' where "candidateId" = ${candidateId} and "expertiseId" = ${expertiseId}`);
      return expertiseDeleteResult.rowCount;
    } catch (err) {
      throw err;
    }
  },

  addExpertise: async (candidateId, expertiseId, createdBy, updatedBy) => {
    try {
      const time = new Date().toISOString();
      const expertiseAdded = await client.query(`insert into "candidateExpertise" 
            ("candidateId","expertiseId","createdBy","updatedBy","createdDatetime","updatedDatetime")
            values ('${candidateId}','${expertiseId}','${createdBy}','${updatedBy}','${time}','${time}')`);
      return expertiseAdded.rowCount;
    } catch (err) {
      throw err;
    }
  },
};
