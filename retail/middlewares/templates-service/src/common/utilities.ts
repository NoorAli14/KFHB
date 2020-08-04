import * as path from 'path';
import { TABLE } from './constants';

function populateKeys(
  selections: any[],
  tableName: string,
  resultArr: string[],
): void {
  selections.forEach(child =>
    // Adding child properties as the key to simplify the Select statement in Knex.
    // Mapping the table name with field name of GQL schema.
    resultArr.push(
      `${TABLE[tableName.toUpperCase()]}.${child.name.value} AS >${tableName}>${
        child.name.value
      }`, // Table Name + Column Name for Nested Table
    ),
  );
}

/**
 * graphqlKeys string[]
 * @param info
 * @param tableName
 * @param resultArr Array to embed the data.
 */
export const graphqlKeys = (
  info: Record<string, unknown>,
  tableName?: string,
  resultArr: string[] = [],
): string[] => {
  const joins = [];
  // TODO: FieldNodes: GraphQL supports multi Query in the Client library, This array contain all those Queries
  info.fieldNodes[0].selectionSet.selections.forEach(item => {
    if (item.selectionSet?.selections) {
      populateKeys(item.selectionSet.selections, item.name.value, resultArr);
      joins.push(item.name.value);
      return;
    }

    if (tableName) {
      // Table Name + Column name for Root Table
      resultArr.push(`${tableName}.${item.name.value} AS >${item.name.value}`);
    } else {
      resultArr.push(item.name.value);
    }
  });

  resultArr['joins'] = joins;
  return resultArr;
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
