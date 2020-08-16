import * as path from 'path';

/**
 * graphqlKeys string[]
 * @param info
 */
export const graphqlKeys = (info: any): string[] => {
  // getting all keys from graphQL query
  let keys: string[] = info.fieldNodes[0].selectionSet.selections.map(
    item => item.name.value,
  );

  // filtering some keys
  const filters = ['id', 'roles', 'modules', 'permissions'];
  keys = keys.filter(function(key) {
    return filters.indexOf(key) === -1;
  });

  // we need the id in every query
  keys.push('id');
  return keys
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

export const addMinutes = (minutes: number): Date => {
  return new Date(new Date().getTime() + minutes*60000);
};
