import { IENV } from './env.interface';

export const DEFAULT_ENV: IENV = {
  APP: {
    NAME: 'Rubix | Boilerplate',
    ENV: 'development',
    PORT: 3000,
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
  logLevel: 'info',
};
