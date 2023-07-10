import logger from '../modules/logger';
import postgresDB from '../modules/postgresDB';

export async function connectAllExternalServices() {
  try {
    await Promise.all([
      postgresDB.connectToDB(),
    ]);
  } catch (error) {
    error instanceof Error ? logger.error(error.message, { tag: 'CONNECTION MANAGER' }) : logger.error(error as string);
    process.exit(1);
  }
}
