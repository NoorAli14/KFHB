import { Injectable } from '@nestjs/common';
import { get } from 'lodash';
import * as dotenv from 'dotenv';
import { isTruthy } from '@rubix/common/utilities';
import {
  iAPP,
  iDATABASE,
  iSWAGGER,
  iGRAPHQL,
  iConfig,
} from '@rubix/common/interfaces/configuration.interface';

export const DEFAULT_ENV: iConfig = {
  APP: {
    NAME: 'Rubix | Identity Service',
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
};
@Injectable()
export class ConfigurationService {
  env: NodeJS.ProcessEnv = process.env;
  private environment: string = process.env.NODE_ENV || 'development';
  constructor() {
    dotenv.config();
  }

  get IDENTITYX() {
    return {
      BASE_URL: this.get('ENV_RBX_IDENTITYX_BASE_URL'),
      VERSION: this.get('ENV_RBX_IDENTITYX_API_VERSION'),
      USERNAME: this.get('ENV_RBX_IDENTITYX_USERNAME'),
      PASSWORD: this.get('ENV_RBX_IDENTITYX_PASSWORD'),
      TOKEN: this.get('ENV_RBX_IDENTITYX_TOKEN'),
      TENANT: this.get('ENV_RBX_IDENTITYX_TENANT'),
    };
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
