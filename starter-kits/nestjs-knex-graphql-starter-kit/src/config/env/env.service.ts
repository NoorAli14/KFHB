import { Injectable } from '@nestjs/common';
import { DEFAULT_ENV } from './env.default';
import { IAPP, IENV, IDATABASE } from './env.interface';
/**
 * Provides a means to access the application configuration.
 */
@Injectable()
export class EnvService {
  private ENV: IENV;

  constructor() {
    this.ENV = this.parseENV(process.env) || DEFAULT_ENV;
  }
  public getNodeEnv(): string {
    return this.ENV?.APP?.ENV || 'development';
  }

  public isTest(): boolean {
    return this.getNodeEnv() === 'test';
  }

  public isDevelopment(): boolean {
    return this.getNodeEnv() === 'development';
  }

  public isProduction(): boolean {
    return this.getNodeEnv() === 'production';
  }

  // public getPkg(): any {
  //   return packageInfo;
  // }

  public isTruthy(bool: string): boolean {
    try {
      return bool.toLowerCase() === 'true';
    } catch (e) {
      return false;
    }
  }
  /**
   * Loads the config from environment variables.
   */
  private parseIApp(env: NodeJS.ProcessEnv): IAPP {
    return {
      ENV: env.NODE_ENV || DEFAULT_ENV.APP.ENV,
      NAME: env.ENV_RBX_APP_NAME || DEFAULT_ENV.APP.NAME,
      API_URL_PREFIX:
        env.ENV_RBX_API_URL_PREFIX || DEFAULT_ENV.APP.API_URL_PREFIX,
      PORT: env.ENV_RBX_PORT
        ? parseInt(env.ENV_RBX_PORT, 10)
        : DEFAULT_ENV.APP.PORT,
    };
  }
  load(): void {
    this.ENV = this.parseENV(process.env) || DEFAULT_ENV;
  }
  private parseENV(env: NodeJS.ProcessEnv): IENV {
    return {
      APP: this.parseIApp(env),
      DATABASE: this.parseIDATABASE(env),
      logLevel: env.LOG_LEVEL || DEFAULT_ENV.logLevel,
    };
  }

  private parseIDATABASE(env: NodeJS.ProcessEnv): IDATABASE {
    return {
      USERNAME: env.ENV_RBX_DB_USERNAME || DEFAULT_ENV.DATABASE.USERNAME,
      DB_PASS: env.ENV_RBX_DB_PASS || DEFAULT_ENV.DATABASE.DB_PASS,
      DB_NAME: env.ENV_RBX_DB_NAME || DEFAULT_ENV.DATABASE.DB_NAME,
      HOST: env.ENV_RBX_DB_HOST || DEFAULT_ENV.DATABASE.HOST,
      PORT: parseInt(env.ENV_RBX_DB_PORT || 'NaN', 10),
      TIMEOUT:
        parseInt(env.ENV_RBX_DB_TIMEOUT || 'NaN', 10) ||
        DEFAULT_ENV.DATABASE.TIMEOUT,
      DIALECT: env.ENV_RBX_DB_DIALECT || DEFAULT_ENV.DATABASE.DIALECT,
      TIMEZONE: env.ENV_RBX_DB_TIMEZONE || DEFAULT_ENV.DATABASE.TIMEZONE,
      IS_DEBUG: this.isDevelopment()
        ? true
        : this.isTruthy(env.ENV_RBX_DB_DEBUG) || DEFAULT_ENV.DATABASE.IS_DEBUG,
    };
  }
  public get(): any {
    return this.ENV;
  }
}
