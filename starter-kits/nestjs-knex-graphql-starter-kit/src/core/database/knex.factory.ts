import { NotImplementedException } from '@nestjs/common';
import * as Knex from 'knex';
import { IDATABASE } from 'src/config/env/env.interface';
export class KnexFactory {
  private static instance: KnexFactory;
  private rawSQL: string | undefined;
  private config: IDATABASE;
  private _connection: Knex;
  private constructor(config: IDATABASE) {
    this.config = config;
  }
  static getInstance(config: IDATABASE): KnexFactory {
    if (!KnexFactory.instance) {
      KnexFactory.instance = new KnexFactory(config);
    }
    return KnexFactory.instance;
  }
  private databaseConfig(): Knex.Config {
    return {
      connection: this.connectionConfig(),
      client: this.config.DIALECT,
      migrations: this.migratorConfig(),
      seeds: this.seedsConfig(),
      pool: this.poolConfig(),
      useNullAsDefault: true,
      debug: this.config.IS_DEBUG,
    };
  }
  private migratorConfig(): Knex.MigratorConfig {
    return {
      tableName: 'rubix_migrations',
      directory: './migrations',
    };
  }
  private poolConfig(): Knex.PoolConfig {
    return {
      min: 2,
      max: 10,
    };
  }
  private seedsConfig(): Knex.SeedsConfig {
    return {
      directory: './seeds',
    };
  }
  setSQL(sql: string): void {
    this.rawSQL = sql;
  }
  getSQL(): string {
    return this.rawSQL;
  }
  private connectionConfig(): Knex.StaticConnectionConfig {
    switch (this.config.DIALECT) {
      case 'mssql':
        this.rawSQL = 'select 1';
        return this.mssql();
      case 'pg':
        return this.pg();
      case 'mysql':
        return this.mysql();
      case 'oracledb':
        return this.oracle();
      default:
        throw new NotImplementedException(
          `Database type '${this.config.DIALECT}' not supported`,
        );
    }
  }
  private mssql(): Knex.MsSqlConnectionConfig {
    return {
      user: this.config.USERNAME,
      password: this.config.DB_PASS,
      server: this.config.HOST,
      port: this.config.PORT,
      database: this.config.DB_NAME,
      connectionTimeout: this.config.TIMEOUT,
      options: {
        encrypt: true,
        useUTC: this.config.TIMEZONE === 'UTC',
        trustedConnection: true,
        enableArithAbort: false,
      },
    };
  }

  private pg(): Knex.PgConnectionConfig {
    return {
      user: this.config.USERNAME,
      database: this.config.DB_NAME,
      host: this.config.HOST,
      connectionTimeoutMillis: this.config.TIMEOUT,
      password: this.config.DB_PASS,
    };
  }

  private oracle(): Knex.OracleDbConnectionConfig {
    return {
      user: this.config.USERNAME,
      host: this.config.HOST,
      password: this.config.DB_PASS,
      requestTimeout: this.config.TIMEOUT,
      connectString:
        '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=' +
        this.config.HOST +
        ')(Port=' +
        this.config.PORT +
        '))(CONNECT_DATA=(SID=' +
        this.config.DB_NAME +
        ')))',
      debug: this.config.IS_DEBUG,
    };
  }

  private mysql(): Knex.MySqlConnectionConfig {
    return {
      host: this.config.HOST,
      port: this.config.PORT,
      user: this.config.USERNAME,
      password: this.config.DB_PASS,
      database: this.config.DB_NAME,
      timezone: this.config.TIMEZONE,
      connectTimeout: this.config.TIMEOUT,
      insecureAuth: false,
    };
  }
  initConnection(): Knex {
    if (!this._connection)
      this._connection = Knex(this.databaseConfig() as Knex.Config);
    return this._connection;
  }
}
