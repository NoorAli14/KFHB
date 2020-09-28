import { Request } from 'express';
import * as path from 'path';
import { IHEADER } from './interfaces';
import { X_CORRELATION_KEY, X_TENANT_ID, X_USER_ID } from './constants';

/**
 * graphqlKeys string[]
 * @param info
 */
export function graphqlFields(info: Record<string, unknown>): string[] {
  const keys = [];
  info.fieldNodes[0].selectionSet.selections.forEach(item => {
    if (!item.selectionSet) {
      keys.push(item.name.value);
    }
  });
  return keys;
}

export const toGraphql = (input: { [key: string]: any }): string => {
  return JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
};

export const uuidV4 = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
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
export const generateRandomString = (length: number): string => {
  return Math.random()
    .toString(36)
    .replace(/[^a-zA-Z0-9]+/g, '')
    .substr(0, length);
};

export const formattedHeader = (req: Request, user_id?: string): IHEADER => {
  let headers: any = {};
  headers[X_CORRELATION_KEY] = req.get(X_CORRELATION_KEY);
  headers[X_USER_ID] = req.get(X_USER_ID);
  headers[X_TENANT_ID] = (req.headers?.[X_TENANT_ID] ||
    req.query?.[X_TENANT_ID]) as string;
  return headers;
};
