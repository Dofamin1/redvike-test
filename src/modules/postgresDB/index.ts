import { POSTGRES_DB } from '../../config';
import logger from '../logger';
import knex, { Knex } from 'knex';

class PostgresDB {
  private _connectionEstablished: boolean;
  private readonly client: Knex;
  constructor() {
    this._connectionEstablished = false;
    this.client = knex({
      client: 'pg',
      connection: {
        host: POSTGRES_DB.HOST,
        port: POSTGRES_DB.PORT,
        user: POSTGRES_DB.USER,
        password: POSTGRES_DB.PASSWORD,
        database: POSTGRES_DB.DB_NAME,
        pool: { min: 1, max: 10 }
      }
    });
  }

  async connectToDB() {
    logger.info('trying to establish a connection...', { tag: 'POSTGRES' });
    await this.client.raw('SELECT 1');
    this._connectionEstablished = true;
    logger.info('connection was established', { tag: 'POSTGRES' });
  }

  getClient(): Knex {
    return this.client;
  }
}

export default new PostgresDB();
