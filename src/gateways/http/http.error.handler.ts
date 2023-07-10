import { InternalError } from '../../errors';
import logger from '../../modules/logger';
import { NODE_ENV } from '../../config';
import { PROD } from '../../constants/node.evns';
import { FastifyRequest, FastifyReply, } from 'fastify';

interface ErrorWithValidation extends Error {
  validation?: boolean
}

interface HttpErrorWithValidation extends InternalError {
  validation?: boolean
}

const httpStatusCodesToErrorsMap: Record<string, number> = {
  BadRequest: 400,
  UnauthorizedError: 401,
  ForbiddenError: 403,
  NotFoundError: 404,
  TimeoutError: 408,
  ConflictError: 409,
  ProcessingError: 422,
  ServerError: 500
};

const errorHandler = (error: ErrorWithValidation | HttpErrorWithValidation, req: FastifyRequest, res: FastifyReply) => {
  logger.error(error.message, { tag: 'HTTP ERROR HANDLER' });

  if (error.validation) return res.status(400).send({
    message: NODE_ENV === PROD ? 'Validation error' : error.message,
    code: 'ERR_BAD_REQUEST',
    statusCode: 400
  });

  if (error instanceof InternalError) {
    const constructorName = error.constructor.name;
    const statusCode = httpStatusCodesToErrorsMap[constructorName] || 500;
    return res.status(statusCode).send({ message: error.message, code: error.code, statusCode });
  }

  return res.status(500).send({ message: 'Unexpected error', code: 'ERR_INTERNAL_FAILURE', statusCode: 500 });
};

export default errorHandler;
