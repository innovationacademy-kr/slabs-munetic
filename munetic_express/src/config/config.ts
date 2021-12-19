import * as dotenv from 'dotenv';
dotenv.config();

const development = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'mariadb',
  // test: {},
  // production: {},
};

module.exports = { development };
