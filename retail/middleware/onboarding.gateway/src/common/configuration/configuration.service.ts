import { Injectable } from '@nestjs/common';
import { get } from 'lodash';
import * as dotenv from 'dotenv';
import { isTruthy } from '@common/utilities';
import {
  iAPP,
  iSWAGGER,
  iGRAPHQL,
  iRATE_LIMITER,
  iCORS,
} from '@common/interfaces/configuration.interface';
import {DEFAULT_ENV} from './configuration.default';

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

  get SWAGGER(): iSWAGGER {
    return {
      ENABLE: isTruthy(
        this.get('ENV_RBX_SWAGGER_ENABLED', DEFAULT_ENV.SWAGGER.ENABLE),
      ),
      ROUTE: this.get('ENV_RBX_SWAGGER_ROUTE', DEFAULT_ENV.SWAGGER.ROUTE),
    };
  }

  get CORS(): iCORS {
    return {
      ENABLE: isTruthy(
        this.get('ENV_RBX_CORS_ENABLED', DEFAULT_ENV.CORS.ENABLE),
      ),
      ORIGIN: this.get('ENV_RBX_CORS_ORIGIN', DEFAULT_ENV.CORS.ORIGIN),
    };
  }

  get RATE_LIMITER(): iRATE_LIMITER {
    return {
      ENABLE: isTruthy(
        this.get(
          'ENV_RBX_RATE_LIMITER_ENABLE',
          DEFAULT_ENV.RATE_LIMITER.ENABLE,
        ),
      ),
      INTERVAL: parseInt(
        this.get(
          'ENV_RBX_RATE_LIMITER_INTERVAL',
          DEFAULT_ENV.RATE_LIMITER.INTERVAL,
        ),
        10,
      ),
      MAX_REQUEST: parseInt(
        this.get(
          'ENV_RBX_RATE_LIMITER_MAX_REQUEST',
          DEFAULT_ENV.RATE_LIMITER.MAX_REQUEST,
        ),
        10,
      ),
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
          this.get('ENV_RBX_SWAGGER_ENABLED', DEFAULT_ENV.SWAGGER.ENABLE),
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