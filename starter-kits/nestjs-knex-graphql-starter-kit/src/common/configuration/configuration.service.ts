import { Injectable, NotImplementedException } from '@nestjs/common';
import * as Knex from 'knex';
import { get } from 'lodash';
import * as dotenv from 'dotenv';
import { isTruthy } from '@common/utilties';
import {
  iAPP,
  iDATABASE,
  iSWAGGER,
  iConfig,
} from '@common/interfaces/configuration.interface';
import {
  DATABASE_MIGRATION_TABLE_NAME,
  DATABASE_MIGRATION_DIRECTORY,
  DATABASE_SEED_DIRECTORY,
} from '@common/constants';
export const DEFAULT_ENV: iConfig = {
  APP: {
    NAME: 'Rubix | Boilerplate',
    DESCRIPTION: '',
    VERSION: '1.0.0',
    ENVIRONMENT: 'development',
    PORT: 3000,
    HOST: '0.0.0.0',
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
  logLevel: 'info',
};
@Injectable()
export class ConfigurationService {
  env: NodeJS.ProcessEnv = process.env;
  private environmentHosting: string = process.env.NODE_ENV || 'development';
  constructor() {
    dotenv.config();
  }

  // Parse iApp Environment Variables
  get APP(): iAPP {
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
  private get DATABASE(): iDATABASE {
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
  databaseConfig(): Knex.Config {
    return {
      connection: this.connectionConfig,
      client: this.DATABASE.DIALECT,
      migrations: this.migratorConfig,
      seeds: this.seedsConfig,
      pool: this.poolConfig,
      useNullAsDefault: true,
      debug: this.DATABASE.IS_DEBUG,
    };
  }
  get migratorConfig(): Knex.MigratorConfig {
    return {
      tableName: DATABASE_MIGRATION_TABLE_NAME,
      directory: DATABASE_MIGRATION_DIRECTORY,
    };
  }
  private get poolConfig(): Knex.PoolConfig {
    return {
      min: 2,
      max: 10,
    };
  }
  private get seedsConfig(): Knex.SeedsConfig {
    return {
      directory: DATABASE_SEED_DIRECTORY,
    };
  }
  get connectionConfig(): Knex.StaticConnectionConfig {
    switch (this.DATABASE.DIALECT) {
      case 'mssql':
        return this.MSSQL;
      case 'pg':
        return this.PG;
      case 'mysql':
        return this.MYSQL;
      case 'oracledb':
        return this.ORACLE;
      default:
        throw new NotImplementedException(
          `Database type '${this.DATABASE.DIALECT}' not supported`,
        );
    }
  }
  private get MSSQL(): Knex.MsSqlConnectionConfig {
    return {
      user: this.DATABASE.USERNAME,
      password: this.DATABASE.DB_PASS,
      server: this.DATABASE.HOST,
      port: this.DATABASE.PORT,
      database: this.DATABASE.DB_NAME,
      connectionTimeout: this.DATABASE.TIMEOUT,
      options: {
        encrypt: true,
        useUTC: this.DATABASE.TIMEZONE === 'UTC',
        trustedConnection: true,
        enableArithAbort: false,
      },
    };
  }

  private get PG(): Knex.PgConnectionConfig {
    return {
      user: this.DATABASE.USERNAME,
      database: this.DATABASE.DB_NAME,
      host: this.DATABASE.HOST,
      connectionTimeoutMillis: this.DATABASE.TIMEOUT,
      password: this.DATABASE.DB_PASS,
    };
  }

  private get ORACLE(): Knex.OracleDbConnectionConfig {
    return {
      user: this.DATABASE.USERNAME,
      host: this.DATABASE.HOST,
      password: this.DATABASE.DB_PASS,
      requestTimeout: this.DATABASE.TIMEOUT,
      connectString:
        '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=' +
        this.DATABASE.HOST +
        ')(Port=' +
        this.DATABASE.PORT +
        '))(CONNECT_DATA=(SID=' +
        this.DATABASE.DB_NAME +
        ')))',
      debug: this.DATABASE.IS_DEBUG,
    };
  }

  private get MYSQL(): Knex.MySqlConnectionConfig {
    return {
      host: this.DATABASE.HOST,
      port: this.DATABASE.PORT,
      user: this.DATABASE.USERNAME,
      password: this.DATABASE.DB_PASS,
      database: this.DATABASE.DB_NAME,
      timezone: this.DATABASE.TIMEZONE,
      connectTimeout: this.DATABASE.TIMEOUT,
      insecureAuth: false,
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
    return this.environmentHosting === 'development';
  }
  get isProduction(): boolean {
    return this.environmentHosting === 'development';
  }
  get isTest(): boolean {
    return this.environmentHosting === 'development';
  }
}
