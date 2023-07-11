import config from '../config';
import pino, { BaseLogger } from 'pino';

type loggerTag = string | null

interface LogMethodOptions {
  tag: loggerTag
}

class Logger {
  private logger: BaseLogger;

  constructor() {
    this.logger = pino({ level: config.LOG_LEVEL });
  }

  info(message: string, { tag }: LogMethodOptions = { tag: null }) {
    const extra = tag ? `[${tag}] ` : '';

    return this.logger.info(`${extra}${message}`);
  }

  warn(message: string, { tag }: LogMethodOptions = { tag: null }) {
    const extra = tag ? `[${tag}] ` : '';

    return this.logger.warn(`${extra}${message}`);
  }

  error(message: string, { tag }: LogMethodOptions = { tag: null }) {
    const extra = tag ? `[${tag}] ` : '';

    return this.logger.error(`${extra}${message}`);
  }
}

export default new Logger();
