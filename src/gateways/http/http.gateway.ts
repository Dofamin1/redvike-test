import config from '../../config';
import { PROD } from '../../constants/node.evns';
import { fastify, FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import errorHandler from './http.error.handler';
import validatorCompiler from './http.validator.compiler';
import reservationsRouter from '../../components/reservations/transport/http/v1/reservations.router';

const server = fastify({
  logger: true,
  disableRequestLogging: config.NODE_ENV === PROD,
});

async function initHttpGateway(): Promise<FastifyInstance> {
  try {
    server.register(cors, { origin: true });
    server.setErrorHandler(errorHandler);
    server.setValidatorCompiler(validatorCompiler);

    server.register(reservationsRouter, { prefix: 'v1/reservations' });

    await server.listen({ host: config.HOST, port: config.PORT });

    return server;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

export default initHttpGateway;