import { Request, Response, NextFunction } from 'express';
import { uuid } from '@common/utilities';
import { X_CORRELATION_KEY } from '@common/constants';

export const CorrelationMiddleware = (): any => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const correlationId = req.header(X_CORRELATION_KEY) || uuid();
    // make sure this is lower-cased, otherwise downstream stuff will barf.
    req.headers[X_CORRELATION_KEY] = correlationId;
    res.set(X_CORRELATION_KEY, correlationId);
    next();
  };
};
