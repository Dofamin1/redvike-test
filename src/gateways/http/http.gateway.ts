import multipart from '@fastify/multipart';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import config from '../../config';
import { PROD } from '../../constants/node.evns';
import { fastify, FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import errorHandler from './http.error.handler';
import validatorCompiler from './http.validator.compiler';
import reservationsRouter from '../../components/reservations/transport/http/v1/reservations.router';
import csvRouter from '../../components/csv/transport/http/v1/csv.router'

const server = fastify({
  logger: true,
  disableRequestLogging: config.NODE_ENV === PROD,
});

async function initHttpGateway(): Promise<FastifyInstance> {
  try {
    server.register(cors, { origin: true });
    server.setErrorHandler(errorHandler);
    server.setValidatorCompiler(validatorCompiler);

    server.register(multipart);

    server.register(reservationsRouter, { prefix: 'v1/reservations' });
    server.register(csvRouter, { prefix: 'v1/csv' });

    server.register(require('@fastify/swagger'), {}); // TODO: add tags
    server.register(require('@fastify/swagger-ui'), { routePrefix: '/docs' });

    await server.listen({ host: config.HOST, port: config.PORT });

    await server.ready();
    server.swagger();

    return server;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

export default initHttpGateway;
