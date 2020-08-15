import * as path from 'path';
import { v4 as uuidV4 } from 'uuid';

export const toGraphql = (input: any): string => {
  return JSON.stringify(input).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );
};
/**
 * Full path string
 * @param fileOrDir
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
export const generateRandomString = (length: number): string => {
  return Math.random()
    .toString(36)
    .replace(/[^a-zA-Z0-9]+/g, '')
    .substr(0, length);
};
