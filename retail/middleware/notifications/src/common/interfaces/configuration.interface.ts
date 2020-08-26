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
export interface iSMTP_AUTH {
  user: string;
  pass: string;
}

export interface iSMTP {
  host: string,
  port: number,
  ignoreTLS: boolean,
  secure: boolean,
  auth: iSMTP_AUTH
}

export interface iOTP {
  pattern: string,
  otp_length: number,
  status: string,
  duration: number,
  OTP_BY_API: boolean,
  API_URL: string,
}

export interface iSMS {
  from: string,
  api_url: string
}
export interface iEMAILSENDER {
  NAME: string,
  EMAIL: string
}

export interface iConfig {
  /** Application Details */
  APP: iAPP;
  /** Database connection details. */
  DATABASE?: iDATABASE;
  SWAGGER?: iSWAGGER;
  GRAPHQL?: iGRAPHQL;
  SMTP?: iSMTP;
  OTP?: iOTP;
  SMS?: iSMS;
  EMAILSENDER?: iEMAILSENDER;
  /**
   * The log level to use.
   * @example 'verbose', 'info', 'warn', 'error'
   */
  logLevel: string;
}
