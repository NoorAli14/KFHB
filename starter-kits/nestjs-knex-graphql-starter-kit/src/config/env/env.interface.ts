/**
 * Configuration for the database connection.
 */
export interface IDATABASE {
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

export interface IAPP {
  NAME: string;
  DESCRIPTION?: string;
  ENV: string;
  /** The port number of the http server to listen on. */
  PORT: number;
  API_URL_PREFIX: string;
  API_INFO_ROUTE?: string;
  API_INFO_ENABLED?: boolean;
  SWAGGER_ENABLED?: boolean;
  MONITOR_ENABLED?: boolean;
}

export interface ISWAGGER {}
/**
 * Configuration data for the app.
 */
export interface IENV {
  /** Application Details */
  APP: IAPP;
  /** Database connection details. */
  DATABASE?: IDATABASE;
  SWAGGER?: ISWAGGER;

  /**
   * The log level to use.
   * @example 'verbose', 'info', 'warn', 'error'
   */
  logLevel: string;
}
