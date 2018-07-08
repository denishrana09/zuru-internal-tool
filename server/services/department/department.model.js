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
  getAllDepartment: async () => {
    try {
      const departmentDBResult = await client.query(`select * from department where
        "isDeleted"= 'false';`);
      return departmentDBResult.rows;
    } catch (err) {
      throw err;
    }
  },

  getDepartmentById: async (departmentId) => {
    try {
      const departmentDBResult = await client.query(`select * from department where "isDeleted" = 'false' and "id" = ${departmentId}`);
      return departmentDBResult.rows[0];
    } catch (err) {
      throw err;
    }
  },

  updateDepartmentById: async (departmentId, req) => {
    try {
      const time = new Date().toISOString();
      const departmentDBResult = await client.query(`UPDATE department SET (name,"updatedBy","updatedDatetime") = ('${req.name}','${req.updatedBy}','${time}') WHERE id =${departmentId};`);
      return departmentDBResult.rowCount;
    } catch (err) {
      throw err;
    }
  },

  deleteDepartmentById: async (departmentId) => {
    try {
      const departmentDBResult = await client.query(`update department set "isDeleted" = 'true' where id = ${departmentId}; `);
      return departmentDBResult.rowCount;
    } catch (err) {
      throw err;
    }
  },

  createNewDepartment: async (req) => {
    try {
      const time = new Date().toISOString();
      const departmentDBResult = await client.query(`INSERT INTO department (name,"createdBy","updatedBy","createdDatetime","updatedDatetime") VALUES  
            ('${req.name}','${req.createdBy}','${req.updatedBy}','${time}','${time}');`);
      return departmentDBResult.rowCount;
    } catch (err) {
      throw err;
    }
  },
};
