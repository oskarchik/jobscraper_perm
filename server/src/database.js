const knex = require('knex');
const { CLIENT, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, HOST, DIALECT } = process.env;
const db = knex({
  client: CLIENT,
  connection: {
    host: HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  },
});

module.exports = db;
