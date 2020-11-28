import { Injectable, NotImplementedException } from '@nestjs/common';
import * as Knex from 'knex';
import { ConfigurationService } from './configuration.service';
import {
  DATABASE_MIGRATION_TABLE_NAME,
  DATABASE_MIGRATION_DIRECTORY,
  DATABASE_SEED_DIRECTORY,
} from '@common/constants';
@Injectable()
export class DBConfigurationService extends ConfigurationService {
  constructor() {
    super();
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
      port: this.DATABASE.PORT,
      connectionTimeoutMillis: this.DATABASE.TIMEOUT,
      password: this.DATABASE.DB_PASS,
      ssl: true,
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
}
