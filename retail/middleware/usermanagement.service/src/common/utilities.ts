import * as path from 'path';
import * as Crypto from 'crypto';
import { DATE_FORMAT, HEADER_NAMES } from '@common/constants';
import * as moment from 'moment';
import * as Knex from 'knex';
import { NotImplementedException } from '@nestjs/common';

/**
 * graphqlFields string[]
 * @param info
 */
export const graphqlFields = (info: { [key: string]: any }): string[] => {
  let keys = [];
  info.fieldNodes[0].selectionSet.selections.forEach(item => {
    if (item.name.value == 'data') {
      item.selectionSet.selections.forEach(item => {
        if (!item.selectionSet) {
          keys.push(item.name.value);
        }
      });
    } else if (!item.selectionSet) {
      keys.push(item.name.value);
    }
  });
  // filtering some keys
  const filters = [
    'id',
    'created_on',
    'roles',
    'modules',
    'permissions',
    'sub_modules',
    'leaves',
    'user'
  ];
  keys = keys.filter(function(key) {
    return filters.indexOf(key) === -1;
  });
  // we need the id in every query
  keys.push('id');
  keys.push('created_on');
  return keys;
};

export const loaderSerializer = (
  data: any[],
  serializer: readonly string[] | any,
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

export const getMutateProps = (
  key: string,
  headers: { [key: string]: any } | any,
  model: { [key: string]: any } | any,
): any => {
  const x_user_id = headers[HEADER_NAMES.X_USER_ID];
  const date = moment().format();
  model[`${key}_by`] = x_user_id;
  model[`${key}_on`] = date;
  return model;
};

export const dateFormat = (date_string: string, utc?: boolean): string => {
  let date = moment(date_string);
  if (utc) date = date.utc();
  return date.format(DATE_FORMAT);
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

export const addMinutes = (minutes: number): Date => {
  return new Date(new Date().getTime() + minutes * 60000);
};

export const getCurrentTimeStamp = (): string => {
  return moment().format();
};

export const uuidV4 = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * DATABASE UUID GENERATION
 * @param knex
 */
export const DATABASE_UUID_METHOD = (knex: Knex): any => {
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
