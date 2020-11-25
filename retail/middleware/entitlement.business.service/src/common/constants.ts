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
  LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
  LOGIN_USER_FAILED: 'LOGIN_USER_FAILED',
  LOGOUT_USER_SUCCESS: 'LOGOUT_USER_SUCCESS',
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
  UPDATE_PASSWORD_SUCCESS: 'UPDATE_PASSWORD_SUCCESS',
  UPDATE_PASSWORD_FAILED: 'UPDATE_PASSWORD_FAILED',
  FORGET_PASSWORD_REQUEST_SUCCESS: 'FORGET_PASSWORD_REQUEST_SUCCESS',
  FORGET_PASSWORD_REQUEST_FAILED: 'FORGET_PASSWORD_REQUEST_FAILED',
};

export const SYSTEM_AUDIT_LOG_STRINGS = {
  LOGOUT_USER_SUCCESS: 'User logged out successfully',
};

export const CONTEXT_NAMESPACE_ID = 'a6a29a6f-6747-4b5f-b99f-07ee96e32f00';
export const GENDER = ['M', 'F'];
export const PASSWORD_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export const NUMBERS = {
  MAX_COLUMN_LENGTH: 255,
  NATIONALITY_ID_LENGTH: 36,
};
