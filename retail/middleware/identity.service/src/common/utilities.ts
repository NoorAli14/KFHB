import * as path from 'path';
import * as glob from 'glob';
import { v4 as uuidV4 } from 'uuid';
import { NotImplementedException } from '@nestjs/common';

export const strToBase64 = (data: any): string => {
  const buff: Buffer = new Buffer(data);
  return buff.toString('base64');
};

export const base64ToStr = (data: string): any => {
  const buff: Buffer = new Buffer(data, 'base64');
  return buff.toString('ascii');
};

/**
 * Serialize Loader result
 * @return serialize object
 */
export const loaderSerializer = (
  data: any,
  serializer: string[],
  key: string,
  serializerKey?: string,
): any => {
  const loaderLookups = {};
  data.forEach(loader => {
    if (!loaderLookups[loader[key]]) loaderLookups[loader[key]] = [];
    loaderLookups[loader[key]].push(loader);
  });
  if (!serializerKey) serializerKey = key;
  if (typeof serializer[0] != 'string')
    return serializer.map(obj => loaderLookups[obj[serializerKey]] || []);
  return serializer.map(id => loaderLookups[id] || []);
};

export const CURRENT_TIMESTAMP = (): any => {
  return new Date();
};
/**
 * Generate v4 uuid string
 * @return uuid string
 */
export const uuid = (): string => {
  return uuidV4();
};

// requires all the files which conform to the given pattern and returns the list of defaults exports
export const requireDefaults = (pattern: string): any => {
  return glob
    .sync(pattern, { cwd: __dirname, absolute: true })
    .map(require)
    .map(imported => imported.default);
};

/**
 * graphqlFields string[]
 * @param info
 */
export const graphqlFields = (info: { [key: string]: any }, data: { [key: string]: any }): string[] => {
  const keys = [];
  if (data?.type) {
    const node = info.fieldNodes[0].selectionSet.selections.find(item => item.typeCondition?.name?.value == data?.type)
    node?.selectionSet.selections.forEach(item => {
      if (!item.selectionSet) {
        keys.push(item.name.value);
      }
    });
  } else {
    info.fieldNodes[0].selectionSet.selections.forEach(item => {
      if (!item.selectionSet) {
        keys.push(item.name.value);
      }
    });
  }

  return keys;
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
  return Math.random()
    .toString(36)
    .replace(/[^a-zA-Z0-9]+/g, '')
    .substr(0, length);
};

/**
 * DATABASE UUID GENERATION
 * @param knex
 */
export const DATABASE_UUID_METHOD = (knex): any => {
  switch (knex.client.config.client) {
    case 'pg':
      return knex.raw('uuid_generate_v4()');
    case 'mssql':
      return knex.raw('NEWID()');
    case 'oracledb':
      return '';
    default:
      throw new NotImplementedException(
        `Database type ['${process.env.ENV_RBX_DB_DIALECT}'] not supported`,
      );
  }
};