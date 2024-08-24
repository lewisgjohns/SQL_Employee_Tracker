const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({
  user: process.env.db_username,
  host: 'localhost',
  database: process.env.db_database,
  password: process.env.db_password,
  port: 5432,
});

module.exports = pool;
