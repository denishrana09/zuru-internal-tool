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
  getAllExpertises: async () => {
    try {
      const expertiseData = await client.query(`select * from expertise
      where "isDeleted" = 'false'`);
      return expertiseData.rows;
    } catch (err) {
      throw err;
    }
  },

  getExpertiseById: async (expertiseId) => {
    try {
      const expertiseData = await client.query(`select * from expertise where "isDeleted" = 'false' and id = ${expertiseId}`);
      return expertiseData.rows;
    } catch (err) {
      throw err;
    }
  },

  updateExpertiseById: async (expertiseId, req) => {
    try {
      const time = new Date().toISOString();
      await client.query(`update expertise SET ("expertiseField","updatedDatetime","updatedBy") = ('${req.expertiseField}','${time}','${req.updatedBy}')  WHERE id =${expertiseId};`);
      const updatedExpertiseData = await client.query(`select * from expertise where id = ${expertiseId}`);
      return updatedExpertiseData.rowCount;
    } catch (err) {
      throw err;
    }
  },

  deleteExpertiseById: async (expertiseId) => {
    try {
      const expertiseData = await client.query(`update expertise set "isDeleted" = 'false' where id = ${expertiseId}`);
      return expertiseData.rowCount;
    } catch (err) {
      throw err;
    }
  },

  createNewExpertise: async (req) => {
    try {
      const time = new Date().toISOString();
      const expertiseData = await client.query(`insert into expertise ("expertiseField","createdBy","updatedBy","createdDatetime","updatedDatetime")
             values ('${req.expertiseField}','${req.createdBy}','${req.updatedBy}','${time}','${time}')`);
      return expertiseData.rowCount;
    } catch (err) {
      throw err;
    }
  },
};
