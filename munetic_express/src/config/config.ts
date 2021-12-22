import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize/dist';
dotenv.config();

export const development = {
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  dialect: 'mariadb' as Dialect,
  // test: {},
  // production: {},
};

// module.exports = { development };
