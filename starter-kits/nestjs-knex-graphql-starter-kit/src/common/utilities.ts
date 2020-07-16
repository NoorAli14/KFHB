import * as path from 'path';

export function fullPath(fileOrDir) {
  return path.join(__dirname, fileOrDir);
}

export function isTruthy(bool: string | Boolean): boolean {
  try {
    return bool == 'true' || bool == true;
  } catch (e) {
    return false;
  }
}
/**
 * normalizePort port string | number
 * @param param
 */
export function normalizePort(param: number | string): number | string {
  const portNumber: number =
    typeof param === 'string' ? parseInt(param, 10) : param;
  if (isNaN(portNumber)) return param;
  else if (portNumber >= 0) return portNumber;
}
/**
 * generate random string
 * @param length
 */
export function generateRandomString(length: number): string {
  return Math.random()
    .toString(36)
    .replace(/[^a-zA-Z0-9]+/g, '')
    .substr(0, length);
}
