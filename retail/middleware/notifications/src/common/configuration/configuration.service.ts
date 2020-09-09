import { Injectable } from '@nestjs/common';
import { get } from 'lodash';
import * as dotenv from 'dotenv';
import { isTruthy } from '@common/utilities';
import {
  iAPP,
  iDATABASE,
  iSWAGGER,
  iGRAPHQL,
  iConfig,
  iSMTP,
  iOTP,
  iSMS,
  iEMAILSENDER,
  iHTTP,
} from '@common/interfaces/configuration.interface';
import {
  DEFAULT_OTP_STATUS,
  DEFAULT_OTP_PATTERN,
  DEFAULT_OTP_LENGTH,
  DEFAULT_OTP_DURATION,
  DEFAULT_SMS_SENDER,
  DEFAULT_SMS_API_URL,
  DEFAULT_RUBIX_OTP_BY_API,
  DEFAULT_SENDING_NAME,
  DEFAULT_SENDING_EMAIL,
  DEFAULT_HTTP_TIMEOUT,
  DEFAULT_HTTP_MAX_REDIRECTS,
} from '@rubix/common/constants';

export const DEFAULT_ENV: iConfig = {
  APP: {
    NAME: 'Rubix | Boilerplate',
    DESCRIPTION: '',
    VERSION: '1.0.0',
    ENVIRONMENT: 'development',
    PORT: 3000,
    HOST: 'http://127.0.0.1',
    API_URL_PREFIX: '/api/v1/',
  },
  DATABASE: {
    USERNAME: '',
    DB_PASS: '',
    DB_NAME: '',
    HOST: '',
    PORT: 0,
    DIALECT: '',
    TIMEZONE: 'UTC',
    TIMEOUT: 30000,
    IS_DEBUG: false,
  },
  SWAGGER: {
    ROUTE: '/api/docs',
  },
  GRAPHQL: {
    ROUTE: '/graphql',
    PLAYGROUND: true,
    DEBUG: true,
  },
  logLevel: 'info',

  SMTP: {
    host: '',
    port: 465,
    ignoreTLS: true,
    secure: false,
    auth: {
      user: '',
      pass: '',
    },
  },
  OTP: {
    otp_length: DEFAULT_OTP_LENGTH,
    pattern: DEFAULT_OTP_PATTERN,
    status: DEFAULT_OTP_STATUS,
    duration: DEFAULT_OTP_DURATION,
    OTP_BY_API: DEFAULT_RUBIX_OTP_BY_API,
    API_URL: '',
  },
  SMS: {
    from: DEFAULT_SMS_SENDER,
    api_url: DEFAULT_SMS_API_URL,
  },
  EMAILSENDER: {
    NAME: DEFAULT_SENDING_NAME,
    EMAIL: DEFAULT_SENDING_EMAIL
  },
  HTTP: {
    TIMEOUT: DEFAULT_HTTP_TIMEOUT,
    MAXDIRECTS: DEFAULT_HTTP_MAX_REDIRECTS
  }
};
@Injectable()
export class ConfigurationService {
  env: NodeJS.ProcessEnv = process.env;
  private environment: string = process.env.NODE_ENV || 'development';
  constructor() {
    dotenv.config();
  }

  // Parse iApp Environment Variables
  public get APP(): iAPP {
    return {
      ENVIRONMENT: this.get('NODE_ENV', DEFAULT_ENV.APP.ENVIRONMENT),
      NAME: this.get('ENV_RBX_APP_NAME', DEFAULT_ENV.APP.NAME),
      API_URL_PREFIX: this.get(
        'ENV_RBX_API_URL_PREFIX',
        DEFAULT_ENV.APP.API_URL_PREFIX,
      ),
      VERSION: this.get('ENV_RBX_APP_VERSION', DEFAULT_ENV.APP.VERSION),
      HOST: this.get('ENV_RBX_HOST', DEFAULT_ENV.APP.HOST),
      PORT: parseInt(this.get('ENV_RBX_PORT', DEFAULT_ENV.APP.PORT), 10),
    };
  }

  // Parse iDatabase Environment Variables
  public get DATABASE(): iDATABASE {
    return {
      USERNAME: this.get('ENV_RBX_DB_USERNAME', DEFAULT_ENV.DATABASE.USERNAME),
      DB_PASS: this.get('ENV_RBX_DB_PASS', DEFAULT_ENV.DATABASE.DB_PASS),
      DB_NAME: this.get('ENV_RBX_DB_NAME', DEFAULT_ENV.DATABASE.DB_NAME),
      HOST: this.get('ENV_RBX_DB_HOST', DEFAULT_ENV.DATABASE.HOST),
      PORT: parseInt(
        this.get('ENV_RBX_DB_PORT', DEFAULT_ENV.DATABASE.PORT),
        10,
      ),
      TIMEOUT: parseInt(
        this.get('ENV_RBX_DB_TIMEOUT', DEFAULT_ENV.DATABASE.TIMEOUT),
        10,
      ),
      DIALECT: this.get('ENV_RBX_DB_DIALECT', DEFAULT_ENV.DATABASE.DIALECT),
      TIMEZONE: this.get('ENV_RBX_DB_TIMEZONE', DEFAULT_ENV.DATABASE.TIMEZONE),
      IS_DEBUG: this.IS_DEVELOPMENT
        ? true
        : isTruthy(this.get('ENV_RBX_DB_DEBUG', DEFAULT_ENV.DATABASE.IS_DEBUG)),
    };
  }

  // Parse iSMTP Environment Variables
  public get SMTP(): iSMTP {
    return {
      host: this.get('ENV_RBX_SMTP_HOST', DEFAULT_ENV.SMTP.host),
      port: parseInt(this.get('ENV_RBX_SMTP_PORT', DEFAULT_ENV.SMTP.port), 10),
      ignoreTLS: isTruthy(
        this.get('ENV_RBX_SMTP_IGNORETLS', DEFAULT_ENV.SMTP.ignoreTLS),
      ),
      secure: isTruthy(
        this.get('ENV_RBX_SMTP_SECURE', DEFAULT_ENV.SMTP.secure),
      ),
      auth: {
        user: this.get('ENV_RBX_SMTP_USER', DEFAULT_ENV.SMTP.auth.user),
        pass: this.get('ENV_RBX_SMTP_PASS', DEFAULT_ENV.SMTP.auth.pass),
      },
    };
  }

  public get OTP(): iOTP {
    return {
      pattern: this.get('ENV_RBX_OTP_PATTERN', DEFAULT_ENV.OTP.pattern),
      otp_length: parseInt(
        this.get('ENV_RBX_OTP_LENGTH', DEFAULT_ENV.OTP.otp_length),
        10,
      ),
      status: this.get('ENV_RBX_OTP_STATUS', DEFAULT_ENV.OTP.status),
      duration: parseInt(
        this.get('ENV_RBX_OTP_DURATION', DEFAULT_ENV.OTP.duration),
        10,
      ),
      OTP_BY_API: isTruthy(
        this.get('ENV_RBX_OTP_BY_API', DEFAULT_ENV.OTP.OTP_BY_API),
      ),
      API_URL: this.get('ENV_RBX_OTP_GENERATOR_API', DEFAULT_ENV.OTP.API_URL),
    };
  }

  public get SMS(): iSMS {
    return {
      from: this.get('ENV_RBX_SMS_SENDER', DEFAULT_ENV.SMS.from),
      api_url: this.get('ENV_RBX_SMS_API_URL', DEFAULT_ENV.SMS.api_url),
    };
  }

  public get EMAILSENDER(): iEMAILSENDER {
    return {
      NAME: this.get('ENV_RBX_SMTP_SENDING_NAME', DEFAULT_ENV.EMAILSENDER.NAME),
      EMAIL: this.get(
        'ENV_RBX_SMTP_SENDING_EMAIL',
        DEFAULT_ENV.EMAILSENDER.EMAIL,
      ),
    };
  }

  public get HTTP(): iHTTP{
    return {
      TIMEOUT: parseInt(
        this.get('ENV_RBX_HTTP_TIMEOUT', DEFAULT_HTTP_TIMEOUT),
        10,
      ),
      MAXDIRECTS: parseInt(
        this.get('ENV_RBX_HTTP_MAX_REDIRECTS', DEFAULT_HTTP_MAX_REDIRECTS),
        10,
      ),
    };
  }

  get SWAGGER(): iSWAGGER {
    return {
      ROUTE: this.get('ENV_RBX_SWAGGER_ROUTE', DEFAULT_ENV.SWAGGER.ROUTE),
    };
  }

  public get GRAPHQL(): iGRAPHQL {
    return {
      ROUTE: this.get('ENV_RBX_GRAPHQL_ROUTE', DEFAULT_ENV.GRAPHQL.ROUTE),
      DEBUG: isTruthy(
        this.get('ENV_RBX_GRAPHQL_DEBUG', DEFAULT_ENV.GRAPHQL.DEBUG),
      ),
      PLAYGROUND: isTruthy(
        this.get('ENV_RBX_GRAPHQL_PLAYGROUND', DEFAULT_ENV.GRAPHQL.PLAYGROUND),
      ),
    };
  }
  get(name: string, _default: any = undefined): string {
    return get(this.env, name, _default);
  }
  get IS_SWAGGER_ENABLED(): boolean {
    return this.IS_DEVELOPMENT
      ? true
      : isTruthy(
          this.get('ENV_RBX_SWAGGER_ENABLED', DEFAULT_ENV.DATABASE.IS_DEBUG),
        );
  }
  get APPLICATION_HOST(): string {
    return this.IS_DEVELOPMENT
      ? `http://localhost:${this.APP.PORT}`
      : this.APP.HOST;
  }
  get IS_DEVELOPMENT(): boolean {
    return this.environment === 'development';
  }
  get IS_PRODUCTION(): boolean {
    return this.environment === 'production';
  }
  get IS_TEST(): boolean {
    return this.environment === 'test';
  }
}
