import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize/dist';
dotenv.config();

export const development = {
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: 'mariadb',
  access_secret: process.env.ACCESS_SECRET,
  refresh_secret: process.env.REFRESH_SECRET,
  domain: process.env.SERVER_HOST,
  // test: {},
  // production: {},
};

// module.exports = { development };
