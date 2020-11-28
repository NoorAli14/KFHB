import { RedisModuleOptions } from 'nestjs-redis';

export interface iSWAGGER {
  ROUTE?: string;
}
export interface iGRAPHQL {
  ROUTE?: string;
  PLAYGROUND?: boolean;
  DEBUG?: boolean;
}
export interface iAPP {
  NAME: string;
  DESCRIPTION?: string;
  ENVIRONMENT: string;
  VERSION?: string;
  /** The port number of the http server to listen on. */
  PORT: number;
  HOST?: string;
  API_URL_PREFIX: string;
  API_INFO_ROUTE?: string;
  API_INFO_ENABLED?: boolean;
  SWAGGER_ENABLED?: boolean;
  MONITOR_ENABLED?: boolean;
}
export interface iDATABASE {
  USERNAME: string;
  DB_PASS?: string;
  DB_NAME: string;
  HOST: string;
  PORT: number;
  DIALECT: string;
  TIMEZONE?: string;
  TIMEOUT?: number;
  IS_DEBUG?: boolean;
}

export interface iVCALL {
  ENV_RBX_CRON_JOB_TIME: number;
  ENV_RBX_NOTIFICATION_MESSAGE_TITLE: string;
  ENV_RBX_NOTIFICATION_MESSAGE_BODY: string;
  ENV_RBX_NOTIFICATION_IMAGE_URL: string;
}

export interface iATTACHMENT {
  ENV_RBX_ATTACHMENT_LOCATION: string;
}

export interface iConfig {
  /** Application Details */
  APP: iAPP;
  /** Database connection details. */
  DATABASE?: iDATABASE;
  SWAGGER?: iSWAGGER;
  GRAPHQL?: iGRAPHQL;
  REDIS?: RedisModuleOptions;
  VCALL?: iVCALL;
  ATTACHMENT?: iATTACHMENT;

  /**
   * The log level to use.
   * @example 'verbose', 'info', 'warn', 'error'
   */
  logLevel: string;
}
