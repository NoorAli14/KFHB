import { Response, Request } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidV4 } from 'uuid';
import * as Crypto from 'crypto';
import { X_CORRELATION_KEY, X_USER_ID, X_TENANT_ID } from './constants';
import { IHEADER } from './interfaces';

export const strToBase64 = (data: string): string => {
  const buff: Buffer = new Buffer(data);
  return buff.toString('base64');
};

export const base64ToStr = (data: string): any => {
  const buff: Buffer = new Buffer(data, 'base64');
  return buff.toString('ascii');
};

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
  const portNumber: number = typeof param === 'string' ? parseInt(param, 10) : param;
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

export const formattedHeader = (req: Request, user_id?: string): IHEADER => {
  const headers: IHEADER = {
    [X_CORRELATION_KEY]: req.headers?.[X_CORRELATION_KEY] as string,
    [X_TENANT_ID]: (req.headers?.[X_TENANT_ID] || req.query?.[X_TENANT_ID]) as string,
  };
  if (user_id) headers[X_USER_ID] = user_id;
  if (req?.user) headers[X_USER_ID] = req?.user['id'] as string;
  return headers;
};

/**
 *
 * @param path
 * @param content
 * helper function to create file inside the folder directory
 */
export const readFileStream = (path: string, response: Response): any => fs.createReadStream(path).pipe(response);
