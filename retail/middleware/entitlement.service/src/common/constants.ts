export const TABLE = {
  USER: 'ENT_USER',
  ROLE: 'ENT_ROLE',
  USER_ROLE: 'ENT_USER_ROLE',
  MODULE: 'ENT_MODULE',
  ROLE_MODULE: 'ENT_ROLE_MODULE',
  PERMISSION: 'ENT_PERMISSION',
  ROLE_MODULE_PERMISSION: 'ENT_ROLE_MODULE_PERMISSION',
};

export const NUMBERS = {
  EXPIRY_IN_MINUTES: 240,
  LENGTH: 60,
};

export const STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export const TEMP_ROLE = {
  ADMIN: 'ADMIN',
};

export const MESSAGES = {
  DELETED: 'Deleted Successfully.',
  INVALID_EMAIL: 'Invalid Email Address',
  INVALID_PASSWORD: 'Invalid Password.',
  INVALID_Email_OR_PASSWORD: 'Invalid Email or Password.',
  INTERNAL_ERROR: 'Internal Error',
  INVALID_TOKEN: 'Invalid Token.',
  TOKEN_EXPIRED: 'Token Expired.',
  PASSWORD_UPDATED: 'Password Updated.'
};

export const DATABASE_UUID_METHOD = 'NEWID()';

export const DATABASE_MIGRATION_TABLE_NAME = 'RUBIX_ENTITLEMENT_MIGRATIONS';
export const DATABASE_MIGRATION_DIRECTORY = 'src/core/database/migrations';
export const DATABASE_SEED_DIRECTORY = 'src/core/database/seeds';
