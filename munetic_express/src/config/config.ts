import * as dotenv from 'dotenv';
dotenv.config();

const development = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'mariadb',
  access_secret: process.env.ACCESS_SECRET,
  refresh_secret: process.env.REFRESH_SECRET,
  domain: process.env.COOKIE_DOMAIN,
  // test: {},
  // production: {},
};

module.exports = { development };
