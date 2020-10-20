export const X_CORRELATION_KEY = 'x-correlation-id';
export const X_CHANNEL_KEY = 'x-channel-id';
export const X_ACCESS_TOKEN = 'x-access-token';
export const X_REFRESH_TOKEN = 'x-refresh-token';
export const X_USER_ID = 'x-user-id';
export const X_TENANT_ID = 'x-tenant-id';
export const MODULE_STATUSES: string[] = ['ACTIVE', 'INACTIVE'];
export const ROLE_STATUSES: string[] = ['ACTIVE', 'INACTIVE'];
export const USER_STATUSES: { [key: string]: string } = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

export const GENDER: string[] = ['M', 'F'];

export const DOCUMENT_TYPES: { [key: string]: string } = {
  SELFIE: 'SELFIE',
  LIVENESS: 'LIVENESS',
  PASSPORT: 'PASSPORT',
  DRIVING_LICENSE: 'DRIVING_LICENSE',
  NATIONAL_ID_FRONT_SIDE: 'NATIONAL_ID_FRONT_SIDE',
  NATIONAL_ID_BACK_SIDE: 'NATIONAL_ID_BACK_SIDE',
};

export const DOCUMENT_STATUSES: { [key: string]: string } = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  PROCESSED: 'PROCESSED',
  FAILED: 'FAILED',
  ARCHIVED: 'ARCHIVED',
};

export const SESSION_STATUSES: { [key: string]: string } = {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED',
};

export const DELIVERY_MODES: { [key: string]: string } = {
  EMAIL: 'email',
  MOBILE: 'mobile',
  BOTH: 'both',
};

export const STATUSES: { [key: string]: string } = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

export const CONTEXT_NAMESPACE_ID =
  'a6a29a6f-6747-4b5f-b99f-07ee96e32f88';
export const DAY_FORMAT = 'MM/DD/YYYY';
export const HOUR_FORMAT = 'HH';
export const DAY_WITH_HOUR_FORMAT = 'MM/DD/YYYY HH';
export const PAGINATION_OUTPUT: string = ` {
  total
  pages
  perPage
  current
  next
  prev
  isFirst
  isLast
}`;
export const DEVICES: string[] = ['ios', 'andriod'];