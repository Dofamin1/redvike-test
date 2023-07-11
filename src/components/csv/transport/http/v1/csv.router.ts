import { FastifyInstance, FastifyPluginOptions, DoneFuncWithErrOrRes, FastifyPluginAsync } from 'fastify';
import responsesSchemas from './csv.responses';
import controller, { CsvController } from './csv.controller';

function router(controller: CsvController) {
  return (fastify: FastifyInstance, opts: FastifyPluginOptions, done: DoneFuncWithErrOrRes) => {
    fastify.post('/parse', {
          schema: {
            response: responsesSchemas.parseCSV
          }
    }, controller.parseCSV)

    done();
  };
}

export default router(controller) as FastifyPluginAsync;

