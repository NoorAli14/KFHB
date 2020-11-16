export const TABLE = {
  USER: 'ENT_USER',
  ROLE: 'ENT_ROLE',
  USER_ROLE: 'ENT_USER_ROLE',
  MODULE: 'ENT_MODULE',
  ROLE_MODULE: 'ENT_ROLE_MODULE',
  PERMISSION: 'ENT_PERMISSION',
  ROLE_MODULE_PERMISSION: 'ENT_ROLE_MODULE_PERMISSION',
  WORKING_WEEK: 'ENT_WORKING_WEEK',
  HOLIDAY: 'ENT_HOLIDAY',
  LEAVE: 'ENT_LEAVE',
  MODULE_PERMISSION: 'ENT_MODULE_PERMISSION',
  MODULE_PERMISSION_ROLE: 'ENT_MODULE_PERMISSION_ROLE',
  LEAVE_TYPE: 'ENT_LEAVE_TYPE',
};

export const NUMBERS = {
  TOKEN_EXPIRY_IN_MINUTES: 240,
  TOKEN_LENGTH: 64,
  MAX_COLUMN_LENGTH: 255,
  LEAVE_DURATION_LENGTH: 10,
  NATIONALITY_ID_LENGTH: 96,
  DEFAULT_PAGE_SIZE: 25,
};

export const HEADER_NAMES = {
  X_USER_ID: 'x-user-id',
  X_TENANT_ID: 'x-tenant-id',
  X_ENTITY_ID: 'x-entity-id',
};

export const DATE_FORMAT = 'YYYY-MM-DD';

export const STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING',
};

export const GENDER = {
  M: 'M',
  F: 'F',
};

export const PAGINATION_PARAMS = {
  PAGE: 'page',
  PER_PAGE: 'perPage',
};

export const TEMP_ROLE = {
  ADMIN: 'ADMIN',
  AGENT: 'AGENT',
  SYSTEM: 'SYSTEM',
  SUPER_ADMIN: 'SUPER ADMIN',
};

export const PERMISSIONS = [
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
  {
    name: 'attend',
  },
]

export const MODULES = [
  {
    name: 'Entitlement',
    slug: 'entitlement',
    sub_modules: [
      {
        name: 'User Management',
        slug: 'users',
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
        slug: 'roles',
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
    ],
    permissions: [
      {
        name: 'view',
      },
    ],
  },
  {
    name: 'Calender',
    slug: 'calender',
    sub_modules: [
      {
        name: 'Working Week',
        slug: 'working-days',
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
        name: 'Holidays',
        slug: 'holidays',
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
        name: 'Leaves',
        slug: 'leaves',
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
    ],
    permissions: [
      {
        name: 'view',
      },
    ],
  },
  {
    name: 'Agent Portal',
    slug: 'agent-portal',
    permissions: [
      {
        name: 'view',
      },
    ],
    sub_modules: [
      {
        name: 'Video',
        slug: 'video',
        permissions: [
          {
            name: 'view',
          },
          {
            name: 'attend',
          },
        ],
      },
      {
        name: 'Customers',
        slug: 'customers',
        permissions: [
          {
            name: 'view',
          },
          {
            name: 'edit',
          },
        ],
      },
    ],
  },
];

export const WEEK_DAYS = {
  SUNDAY: 'SUNDAY',
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
};

export const MESSAGES = {
  DELETED: 'Deleted Successfully.',
  INVALID_EMAIL: 'Invalid Email Address',
  INVALID_ID: 'Invalid ID',
  INVALID_DATE: 'Invalid Date format',
  INVALID_PASSWORD: 'Invalid Password.',
  INVALID_Email_OR_PASSWORD: 'Invalid Email or Password.',
  INTERNAL_ERROR: 'Internal Error',
  INVALID_TOKEN: 'Invalid Token.',
  TOKEN_EXPIRED: 'Token Expired.',
  PASSWORD_UPDATED: 'Password Updated.',
  NOT_FOUND: 'No Record Found',
  USER_NOT_FOUND: 'No user exists against this user_id',
  LEAVE_TYPE_NOT_FOUND: 'No leave_type exists against this leave_type_id',
  BAD_REQUEST: 'Bad Request',
  BAD_TIME_FORMAT: 'Bad Time Format',
  FD_ST_ET_REQUIRED: 'You need to fill full_day or start_time and end_time',
  INVALID_WEEKDAY: `Weekday should be one of ${Object.keys(WEEK_DAYS)}`,
  INVALID_STATUS: `Status should be one of ${Object.keys(STATUS)}`,
  INVALID_GENDER: `Gender should be one of ${Object.keys(GENDER)}`,
  ROLE_EXISTS: 'Role with this name already exists',
  WEEK_DAY_EXISTS: 'Week day already exists',
  PASSWORD_MISMATCH: 'Current password did not match',
};

export const DATABASE_MIGRATION_TABLE_NAME = 'RUBIX_ENTITLEMENT_MIGRATIONS';
export const DATABASE_MIGRATION_DIRECTORY = 'src/core/database/migrations';
export const DATABASE_SEED_DIRECTORY = 'src/core/database/seeds';
