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
  getAllRoles: async () => {
    try {
      const roleDBResult = await client.query(`select * from role
       where "isDeleted" = 'false'`);
      return roleDBResult.rows;
    } catch (err) {
      throw err;
    }
  },

  getRoleById: async (roleId) => {
    try {
      const roleDBResult = await client.query(`select * from role where "isDeleted" = 'false' and id = ${roleId}`);
      return roleDBResult.rows[0];
    } catch (err) {
      throw err;
    }
  },

  updateRoleById: async (roleId, requestData) => {
    try {
      const time = new Date().toISOString();
      const roleDBResult = await client.query(`UPDATE role SET (role,"updatedDatetime","updatedBy")
       = ('${requestData.role}','${time}','${requestData.updatedBy}')  WHERE id =${roleId};`);
      return roleDBResult.rowCount;
    } catch (err) {
      throw err;
    }
  },

  deleteRoleById: async (roleId) => {
    try {
      const roleDBResult = await client.query(`update role set "isDeleted" = 'false' where id = ${roleId}`);
      return roleDBResult.rowCount;
    } catch (err) {
      throw err;
    }
  },

  createNewRole: async (requestData) => {
    try {
      const time = new Date().toISOString();
      const roleDBResult = await client.query(`Insert into role (role,"createdBy","updatedBy","createdDatetime","updatedDatetime")
            values ('${requestData.roleName}','${requestData.createdBy}','${requestData.updatedBy}','${time}','${time}')`);
      return roleDBResult.rowCount;
    } catch (err) {
      throw err;
    }
  },
};
