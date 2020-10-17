import { NotImplementedException } from '@nestjs/common';
import { Request } from 'express';
import * as path from 'path';
import { X_CORRELATION_KEY, X_TENANT_ID, X_USER_ID } from './constants';
import { IHEADER } from './interfaces';

/**
 * Make JSON.Stringify compatible with GraphQL by removing quotes from the Keys.
 * In Futuer we can add this to the JSON Prototype to extend the functionality of JSON library instead of calling a custom function
 * @param object Object to Stringify
 */
export const toGraphQL = (input: { [key: string]: any }): string => {
  return JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
};

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

export function uuidV4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Validate an UUID v4 string
 *
 * @param uuid a string value containing UUID
 * @returns Validity of the provided param
 */
export function validate_uuidV4(uuid: string): boolean {
  const validationRegex = /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-4[A-Za-z0-9]{3}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/;
  try {
    const result = validationRegex.test(uuid);
    return result;
  } catch (error) {
    console.log('error', error);
  }
}

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

export const formattedHeader = (req: Request): IHEADER => {
  const headers: any = {};
  headers[X_CORRELATION_KEY] = req.get(X_CORRELATION_KEY);
  headers[X_USER_ID] = req.get(X_USER_ID);
  headers[X_TENANT_ID] = (req.headers?.[X_TENANT_ID] ||
    req.query?.[X_TENANT_ID]) as string;
  return headers;
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
