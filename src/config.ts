import * as dotenv from 'dotenv';
import { WARN } from './constants/log.levels';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
export const HOST = process.env.HOST || '127.0.0.1';
export const LOG_LEVEL = process.env.LOG_LEVEL || WARN;

export const POSTGRES_DB = {
  HOST: process.env.POSTGRES_HOST,
  PORT: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432,
  DB_NAME: process.env.POSTGRES_DB_NAME,
  USER: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD
};

export default { NODE_ENV, PORT, HOST, LOG_LEVEL, POSTGRES_DB };
