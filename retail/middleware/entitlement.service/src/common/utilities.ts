import * as path from 'path';
import * as Crypto from 'crypto';
import {HEADER_NAMES} from '@common/constants';
import * as moment from 'moment';

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
  const filters = ['id', 'roles', 'modules', 'permissions', 'sub_modules', 'leaves'];
  keys = keys.filter(function(key) {
    return filters.indexOf(key) === -1;
  });

  // we need the id in every query
  keys.push('id');
  return keys
};

/**
 * graphqlFields string[]
 * @param info
 */
export const graphqlFields = (info: { [key: string]: any }): string[] => {
  let keys = [];
  info.fieldNodes[0].selectionSet.selections.forEach(item => {
    if (!item.selectionSet) {
      keys.push(item.name.value);
    }
  });

  // filtering some keys
  const filters = ['id', 'roles', 'modules', 'permissions', 'sub_modules', 'leaves'];
  keys = keys.filter(function(key) {
    return filters.indexOf(key) === -1;
  });

  // we need the id in every query
  keys.push('id');
  keys.push('created_on');
  return keys
};

export const toPlainAttributes = (model, tableName) : any => {
  let keys = Object.keys(model);
  const filters = ['roles', 'modules', 'permissions', 'sub_modules', 'leaves'];
  keys = keys.filter(key => filters.indexOf(key) === -1);
  return keys.map(key => `${tableName}.${key}`)
};

export const loaderSerializer = (data: any, serializer:string[], key: string, serializerKey?: string): any => {
  const loaderLookups = {};
  data.forEach(loader => {
    if (!loaderLookups[loader[key]])
      loaderLookups[loader[key]] = [];
    loaderLookups[loader[key]].push(loader)
  });
  if(!serializerKey)
    serializerKey = key;
  if (typeof serializer[0] != 'string')
    return serializer.map(obj => loaderLookups[obj[serializerKey]] || []);
  return serializer.map(id => loaderLookups[id] || []);
};

export const getMutateProps = (key: string, headers: any, model: any): any => {
  const x_user_id = headers[HEADER_NAMES.X_USER_ID];
  const date = moment().format();
  model[`${key}_by`] = x_user_id;
  model[`${key}_on`] = date;
  return model
};

export const getTenantID = (headers: any): any => {
  return headers[HEADER_NAMES.X_TENANT_ID];
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
export const generateRandomString = (length=36): string => {
  return Crypto
  .randomBytes(length)
  .toString('hex')
  .slice(0, length)
};

export const addMinutes = (minutes: number): Date => {
  return new Date(new Date().getTime() + minutes*60000);
};
