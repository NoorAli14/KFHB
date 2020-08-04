import * as path from 'path';
import { TABLE } from './constants';

/**
 * graphqlKeys string[]
 * @param info
 */
export const graphqlKeys = (
  info: Record<string, unknown>,
  mainTableName?: string,
): string[] => {
  const joins = [];
  const result = [];
  info.fieldNodes[0].selectionSet.selections.forEach(item => {
    if (item.selectionSet?.selections) {
      item.selectionSet.selections.forEach(child =>
        // Adding child properties as the key to simplify the Select statement in Knex.
        // Mapping the table name with field name of GQL schema.
        result.push(
          `${TABLE[item.name.value.toUpperCase()]}.${child.name.value} AS >${
            item.name.value
          }>${child.name.value}`, // Table Name + Column Name for Nested Table
        ),
      );
      // To facilitate the Knex later and add joins based on this array.
      joins.push(item.name.value);
      return;
    }

    if (mainTableName)
      result.push(`${mainTableName}.${item.name.value} AS >${item.name.value}`);
    // Table Name + Column name for Root Table
    else result.push(item.name.value);
  });

  result['joins'] = joins;
  return result;
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
