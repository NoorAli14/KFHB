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
  iVCALL,
  iATTACHMENT,
} from '@common/interfaces/configuration.interface';
import { RedisModuleOptions } from 'nestjs-redis';

export const DEFAULT_ENV: iConfig = {
  APP: {
    NAME: 'Rubix | Template Service',
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
  REDIS: {
    name: 'development',
    url: 'redis://127.0.0.1:6379/4',
  },
  VCALL: {
    ENV_RBX_CRON_JOB_TIME: 30,
    ENV_RBX_NOTIFICATION_MESSAGE_TITLE: 'Dummy: until get from Business Team.',
    ENV_RBX_NOTIFICATION_MESSAGE_BODY: 'Dummy: until get from Business Team.',
    ENV_RBX_NOTIFICATION_IMAGE_URL:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTZELk_VnIIulq0wOTiIXsyhXh0GNXfMInuJg&usqp=CAU',
  },
  ATTACHMENT: {
    ENV_RBX_ATTACHMENT_LOCATION: './uploads/ROB_AgentScreenshots/',
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

  public get REDIS(): RedisModuleOptions {
    return {
      name: this.get('NODE_ENV', DEFAULT_ENV.REDIS.name),
      url: this.get('ENV_RBX_REDIS_URL', DEFAULT_ENV.REDIS.url),
      enableReadyCheck: true,
    };
  }

  // Parse iVCall Environment Variables
  public get VCALL(): iVCALL {
    return {
      ENV_RBX_CRON_JOB_TIME: parseInt(
        this.get(
          'ENV_RBX_CRON_JOB_TIME',
          DEFAULT_ENV.VCALL.ENV_RBX_CRON_JOB_TIME,
        ),
        10,
      ),
      ENV_RBX_NOTIFICATION_MESSAGE_TITLE: this.get(
        'ENV_RBX_NOTIFICATION_MESSAGE_TITLE',
        DEFAULT_ENV.VCALL.ENV_RBX_NOTIFICATION_MESSAGE_TITLE,
      ),
      ENV_RBX_NOTIFICATION_MESSAGE_BODY: this.get(
        'ENV_RBX_NOTIFICATION_MESSAGE_BODY',
        DEFAULT_ENV.VCALL.ENV_RBX_NOTIFICATION_MESSAGE_BODY,
      ),
      ENV_RBX_NOTIFICATION_IMAGE_URL: this.get(
        'ENV_RBX_NOTIFICATION_IMAGE_URL',
        DEFAULT_ENV.VCALL.ENV_RBX_NOTIFICATION_IMAGE_URL,
      ),
    };
  }

  public get ATTACHMENT(): iATTACHMENT {
    return {
      ENV_RBX_ATTACHMENT_LOCATION: this.get(
        'ENV_RBX_ATTACHMENT_LOCATION',
        DEFAULT_ENV.ATTACHMENT.ENV_RBX_ATTACHMENT_LOCATION,
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
