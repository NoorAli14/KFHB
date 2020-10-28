export const X_CORRELATION_KEY = 'x-correlation-id';
export const X_CHANNEL_KEY = 'x-channel-id';
export const X_ACCESS_TOKEN = 'x-access-token';
export const X_REFRESH_TOKEN = 'x-refresh-token';
export const X_USER_ID = 'x-user-id';
export const X_TENANT_ID = 'x-tenant-id';
export const MODULE_STATUSES = ['ACTIVE', 'INACTIVE'];
export const ROLE_STATUSES = ['ACTIVE', 'INACTIVE'];
export const USER_STATUSES = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};
export const PAGINATION_OUTPUT = ` {
  total
  pages
  pageSize
  page
}`;
export const CONTEXT_NAMESPACE_ID =
  'a6a29a6f-6747-4b5f-b99f-07ee96e32f00';
export const GENDER = ['M', 'F'];
export const PASSWORD_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export const NUMBERS = {
  MAX_COLUMN_LENGTH: 255,
};
