import {
  iConfig,
} from '@rubix/common/interfaces/configuration.interface';
export const DEFAULT_ENV: iConfig = {
  APP: {
    NAME: 'Admin Business Service',
    DESCRIPTION: '',
    VERSION: '1.0.0',
    PORT: null,
    HOST: '',
    ENVIRONMENT: 'development',
    API_URL_PREFIX: '/api/v1/',
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