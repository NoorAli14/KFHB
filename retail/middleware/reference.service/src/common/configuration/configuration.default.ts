import { iConfig } from '@rubix/common/interfaces/configuration.interface';
export const DEFAULT_ENV: iConfig = {
  APP: {
    NAME: 'Rubix | Reference Service',
    DESCRIPTION: '',
    VERSION: '1.0.0',
    PORT: null,
    HOST: '',
    ENVIRONMENT: 'development',
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
    ENABLE: true,
    ROUTE: '/api/docs',
  },
  GRAPHQL: {
    ROUTE: '/graphql',
    PLAYGROUND: true,
    DEBUG: true,
  },
  RATE_LIMITER: {
    ENABLE: true,
    INTERVAL: 10,
    MAX_REQUEST: 100,
  },
  CORS: {
    ENABLE: false,
    ORIGIN: null,
  },
  logLevel: 'info',
};
