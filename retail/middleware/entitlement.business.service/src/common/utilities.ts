import * as path from 'path';
import { v4 as uuidV4 } from 'uuid';
import * as Crypto from 'crypto';
import { X_CORRELATION_KEY, X_USER_ID, X_TENANT_ID } from './constants';

export const toGraphql = (input: { [key: string]: any }): string => {
  return JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
};
/**
 * Generate v4 uuid string
 * @return uuid string
 */
export const uuid = (): string => {
  return uuidV4();
};

/**
 * Full path string
 * @param fileOrDir
 */
export const fullPath = (fileOrDir: string): string => {
  return path.join(__dirname, fileOrDir);
};

/**
 * isTruthy  string | boolean
 * @param bool
 */
export const isTruthy = (bool: string | boolean): boolean => {
  try {
    return bool == 'true' || bool == true;
  } catch (e) {
    return false;
  }
};

/**
 * normalizePort port string | number
 * @param param
 */
export const normalizePort = (param: number | string): number | string => {
  const portNumber: number =
    typeof param === 'string' ? parseInt(param, 10) : param;
  if (isNaN(portNumber)) return param;
  else if (portNumber >= 0) return portNumber;
};

/**
 * generate random string
 * @param length
 */
export const generateRandomString = (length = 36): string => {
  return Crypto.randomBytes(length)
    .toString('hex')
    .slice(0, length);
};

export const formattedHeader = (
  req: any,
  user_id?: string
): any => {
  const _headers: { [key: string]: string } = {};
  _headers[X_CORRELATION_KEY] = req.headers[X_CORRELATION_KEY];
  if (user_id) _headers[X_USER_ID] = user_id;
  if (req?.user) _headers[X_USER_ID] = req?.user?.id;
  _headers[X_TENANT_ID] = req.headers[X_TENANT_ID] || req.query[X_TENANT_ID];
  return _headers;
};
