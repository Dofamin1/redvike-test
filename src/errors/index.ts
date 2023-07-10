import errorCodes from './errors.codes';

export class InternalError extends Error {
  public code: string;

  constructor(message: string, { code }: { code: string } = { code: 'ERR_INTERNAL_FAILURE' }) {
    super(message);
    this.code = code;
  }
}

export class BadRequest extends InternalError {
  constructor(message: string) {
    super(message, { code: errorCodes.BAD_REQUEST });
  }
}

export class UnauthorizedError extends InternalError {
  constructor(message: string) {
    super(message, { code: errorCodes.UNAUTHORISED });
  }
}

export class ForbiddenError extends InternalError {
  constructor(message: string) {
    super(message, { code: errorCodes.FORBIDDEN });
  }
}

export class NotFoundError extends InternalError {
  constructor(message: string) {
    super(message, { code: errorCodes.NOT_FOUND });
  }
}

export class TimeoutError extends InternalError {
  constructor(message: string) {
    super(message, { code: errorCodes.REQUEST_TIMED_OUT });
  }
}

export class ProcessingError extends InternalError {
  constructor(message: string) {
    super(message, { code: errorCodes.PROCESSING_FAILED });
  }
}

export class ConflictError extends InternalError {
  constructor(message: string) {
    super(message, { code: errorCodes.CONFLICT });
  }
}


export default { InternalError, BadRequest, UnauthorizedError, ForbiddenError, NotFoundError, TimeoutError, ConflictError, ProcessingError };
