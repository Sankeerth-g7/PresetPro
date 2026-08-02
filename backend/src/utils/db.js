const pgp = require('pg-promise')();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'presetpro_db',
  user: process.env.DB_USER || 'postgres',
  password: String(process.env.DB_PASSWORD) || 'admin'
};

console.log('Connecting to DB:', { ...dbConfig, password: '***' });

const db = pgp(dbConfig);

module.exports = db;