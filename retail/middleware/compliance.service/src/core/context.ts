import {
  Namespace,
  createNamespace,
  getNamespace as _getNamespace,
} from 'cls-hooked';
import { Request, Response, NextFunction } from 'express';

import { CONTEXT_NAMESPACE_ID, X_CORRELATION_KEY } from '@common/constants';
import { IHEADER } from '@common/interfaces';

const __ns: Namespace = createNamespace(CONTEXT_NAMESPACE_ID);

export const RequestContextMiddleware = (): any => {
  return (req: Request, res: Response, next: NextFunction): void => {
    __ns.bindEmitter(req);
    __ns.bindEmitter(res);
    __ns.run(() => {
      getNamespace().set(X_CORRELATION_KEY, req.get(X_CORRELATION_KEY));
      next();
    });
  };
};

export const getNamespace = (): Namespace => {
  return _getNamespace(CONTEXT_NAMESPACE_ID);
};
/**
 * Gets a value from the context by key.  Will return undefined if the context has not yet been initialized for this request or if a value is not found for the specified key.
 * @param {string} key
 */
export const getContext = (key: string): any => {
  if (__ns && __ns.active) {
    return __ns.get(key);
  }
};

/**
 * Adds a value to the context by key.  If the key already exists, its value will be overwritten.  No value will persist if the context has not yet been initialized.
 * @param {string} key
 * @param {*} value
 */
export const setContext = (
  key: string,
  value: { [key: string]: any } | string,
): void => {
  if (__ns && __ns.active) {
    return __ns.set(key, value as any);
  }
};

export const HttpHeaders = (): IHEADER => {
  return getContext('HttpHeaders') as IHEADER;
};
