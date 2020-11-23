export const X_CORRELATION_KEY = 'x-correlation-id';
export const X_CHANNEL_KEY = 'x-channel-id';
export const X_ACCESS_TOKEN = 'x-access-token';
export const X_REFRESH_TOKEN = 'x-refresh-token';
export const X_USER_ID = 'x-user-id';
export const X_TENANT_ID = 'x-tenant-id';
export const X_ENTITY_ID = 'x-entity-id';
export const MODULE_STATUSES = ['ACTIVE', 'INACTIVE'];
export const ROLE_STATUSES = ['ACTIVE', 'INACTIVE'];

export const USER_STATUSES = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

export const STATUSES = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

export const SEND_STATUSES: { [key: string]: string } = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

export const OTP_STATUSES: { [key: string]: string } = {
  PENDING: 'PENDING',
  VERIFIED: 'OTP_VERIFIED',
  NOT_VERIFIED: 'NOT_VERIFIED',
};

export const PAGINATION_OUTPUT = ` {
  total
  pages
  pageSize
  page
}`;

export const DELIVERY_MODES: { [key: string]: string } = {
  EMAIL: 'email',
  MOBILE: 'mobile',
  BOTH: 'both',
};

export const SYSTEM_AUDIT_CODES = {
  USER_LOGIN: 'USER_LOGIN',
  USER_CREATED: 'USER_CREATED',
  USER_MODIFIED: 'USER_MODIFIED',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  PASSWORD_UPDATED: 'PASSWORD_UPDATED',
  PASSWORD_UPDATE_FAILED: 'PASSWORD_UPDATE_FAILED',
  FORGET_PASSWORD_REQUEST: 'FORGET_PASSWORD_REQUEST',
  USER_DELETED: 'USER_DELETED',
  USER_LOGOUT: 'USER_LOGOUT', // not used yet
};

export const SYSTEM_AUDIT_LOG_STRINGS = {
  LOGOUT_SUCCESS: 'Logged out Successfully',
};

export const CONTEXT_NAMESPACE_ID = 'a6a29a6f-6747-4b5f-b99f-07ee96e32f00';
export const GENDER = ['M', 'F'];
export const PASSWORD_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export const NUMBERS = {
  MAX_COLUMN_LENGTH: 255,
  NATIONALITY_ID_LENGTH: 36,
};
