import { Sequelize } from "sequelize";
require('dotenv').config();

export const database = new Sequelize({
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  dialect: "mysql",
  logging: process.env.APP_DEBUG == 'true' ? true : false
});