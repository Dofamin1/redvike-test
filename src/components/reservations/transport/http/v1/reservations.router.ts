import { FastifyInstance, FastifyPluginOptions, DoneFuncWithErrOrRes, FastifyPluginAsync } from 'fastify';
import validationSchemas from './reservations.validation.schemas';
import responsesSchemas from './reservations.responses';
import controller, { ReservationsController } from './reservations.controller';

function router(controller: ReservationsController) {
  return (fastify: FastifyInstance, opts: FastifyPluginOptions, done: DoneFuncWithErrOrRes) => {

    fastify.get('/user/:userId', {
          schema: {
            params: validationSchemas.getReservationsForUser.params,
            response: responsesSchemas.getReservationsForUser
          }
        },
        controller.getReservationsForUser);

    fastify.get('/by-date', {
      schema: {
        querystring: validationSchemas.getReservationsForDate.querystring,
        response: responsesSchemas.getReservationsForDate
      }
    },
    controller.getReservationsForDate);

    //
    // fastify.get('/parse-csv', {
    //       schema: {
    //         querystring: validationSchemas.getReservationsForUser.querystring,
    //         response: responsesSchemas.getReservationsForUser
    //       }
    // },
    //     controller.parseCSV)

    done();
  };
}

export default router(controller) as FastifyPluginAsync;

