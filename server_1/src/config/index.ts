import dotenv from 'dotenv';
import database from './database';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  host: process.env.HOST,
  port: process.env.PORT,
  mock_api: process.env.MOCK_SERVER_API,

  db: database(
    process.env.DATABASE_NAME || "",
    process.env.DATABASE_HOST || "",
    process.env.DATABASE_USERNAME || "",
    process.env.DATABASE_PASSWORD || "",
  ),

  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  api: {
    prefix: process.env.API_PREFIX || '/api',
  },
};