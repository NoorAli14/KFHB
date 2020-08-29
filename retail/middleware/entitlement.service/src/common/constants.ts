export const TABLE = {
  USER: 'ENT_USER',
  ROLE: 'ENT_ROLE',
  USER_ROLE: 'ENT_USER_ROLE',
  MODULE: 'ENT_MODULE',
  ROLE_MODULE: 'ENT_ROLE_MODULE',
  PERMISSION: 'ENT_PERMISSION',
  ROLE_MODULE_PERMISSION: 'ENT_ROLE_MODULE_PERMISSION',
  WORKING_WEEK: 'ENT_WORKINGWEEK',
  HOLIDAY: 'ENT_HOLIDAY',
  LEAVE: 'ENT_LEAVE',
  MODULE_PERMISSION: 'ENT_MODULE_PERMISSION',
  MODULE_PERMISSION_ROLE: 'ENT_MODULE_PERMISSION_ROLE',
};

export const NUMBERS = {
  TOKEN_EXPIRY_IN_MINUTES: 240,
  TOKEN_LENGTH: 64,
  MAX_COLUMN_LENGTH: 255,
  NATIONALITY_ID_LENGTH: 96,
  DEFAULT_PAGE_SIZE: 25,
};

export const STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING',
};

export const TEMP_ROLE = {
  ADMIN: 'ADMIN',
  SYSTEM: 'SYSTEM',
  SUPER_ADMIN: 'SUPER ADMIN',
};

export const MODULES = [
  {
    name: 'Entitlement',
    sub_modules: [
      {
        name: 'User Management',
        permissions: [
          {
            name: 'view',
          },
          {
            name: 'edit',
          },
          {
            name: 'delete',
          },
          {
            name: 'create',
          },
        ],
      },
      {
        name: 'Role Management',
        permissions: [
          {
            name: 'view',
          },
        ],
      },
    ],
    permissions: [
      {
        name: 'view',
      },
    ],
  },
  {
    name: 'Calender',
    sub_modules: [
      {
        name: 'Working Week',
        permissions: [
          {
            name: 'view',
          },
        ],
      },
      {
        name: 'Holidays',
        permissions: [
          {
            name: 'view',
          },
        ],
      },
    ],
    permissions: [
      {
        name: 'view',
      },
    ],
  },
];

export const WEEK_DAYS = {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY',
};

export const MESSAGES = {
  DELETED: 'Deleted Successfully.',
  INVALID_EMAIL: 'Invalid Email Address',
  INVALID_ID: 'Invalid ID',
  INVALID_PASSWORD: 'Invalid Password.',
  INVALID_Email_OR_PASSWORD: 'Invalid Email or Password.',
  INTERNAL_ERROR: 'Internal Error',
  INVALID_TOKEN: 'Invalid Token.',
  TOKEN_EXPIRED: 'Token Expired.',
  PASSWORD_UPDATED: 'Password Updated.',
  NOT_FOUND: 'No Record Found',
  BAD_REQUEST: 'Bad Request',
  BAD_TIME_FORMAT: 'Bad Time Format',
  INVALID_WEEKDAY: `Weekday should be one of ${Object.keys(WEEK_DAYS)}`,
  INVALID_STATUS: `Status should be one of ${Object.keys(STATUS)}`,
};

export const DATABASE_UUID_METHOD = 'NEWID()';
export const DATABASE_MIGRATION_TABLE_NAME = 'RUBIX_ENTITLEMENT_MIGRATIONS';
export const DATABASE_MIGRATION_DIRECTORY = 'src/core/database/migrations';
export const DATABASE_SEED_DIRECTORY = 'src/core/database/seeds';
