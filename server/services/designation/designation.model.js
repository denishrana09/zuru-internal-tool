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
  getAllDesignation: async () => {
    try {
      const designationDBResult = await client.query(`select * from designation
       where "isDeleted" = 'false';`);
      return designationDBResult.rows;
    } catch (err) {
      throw err;
    }
  },

  getDesignationById: async (designationId) => {
    try {
      const designationDBResult = await client.query(`select * from designation where "isDeleted" = 'false' and "id" = ${designationId}`);
      return designationDBResult.rows;
    } catch (err) {
      throw err;
    }
  },

  updateDesignationById: async (designationId, req) => {
    try {
      const time = new Date().toISOString();
      const designationDBResult = await client.query(`UPDATE designation SET (name,"updatedBy","updatedDatetime") = ('${req.name}','${req.updatedBy}','${time}') WHERE id =${designationId};`);
      return designationDBResult.rowCount;
    } catch (err) {
      throw err;
    }
  },

  deleteDesignationById: async (designationId) => {
    try {
      const designationDBResult = await client.query(`update designation set "isDeleted" = 'true' where id = ${designationId}; `);
      return designationDBResult.rowCount;
    } catch (err) {
      throw err;
    }
  },

  createNewDesignation: async (req) => {
    try {
      const time = new Date().toISOString();
      const designationDBResult = await client.query(`INSERT INTO designation (name,"createdBy","updatedBy","createdDatetime","updatedDatetime") VALUES  
            ('${req.name}','${req.updatedBy}','${req.createdBy}','${time}','${time}');`);
      return designationDBResult.rowCount;
    } catch (err) {
      throw err;
    }
  },
};
