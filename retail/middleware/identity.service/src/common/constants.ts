export const TABLE: { [key: string]: string } = {
  SESSION: 'IDT_SESSION',
  DOCUMENT_TYPE: 'IDT_DOCUMENT_TYPE',
  CUSTOMER: 'IDT_CUSTOMER',
};

export const DATABASE_UUID_METHOD: string = 'NEWID()';
export const DATABASE_MIGRATION_TABLE_NAME: string =
  'RUBIX_IDENTITY_MIGRATIONS';
export const DATABASE_MIGRATION_DIRECTORY: string =
  'src/core/database/migrations';
export const DATABASE_SEED_DIRECTORY: string = 'src/core/database/seeds';
export const X_USER_ID: string = 'x-user-id';
export const X_TENANT_ID: string = 'x-tenant-id';

export const DOCUMENT_TYPES = [
  'SELFIE',
  'LIVENESS',
  'PASSPORT',
  'DRIVING_LICENSE',
  'NATIONAL_ID_FRONT_SIDE',
  'NATIONAL_ID_BACK_SIDE',
];
export const SESSION_STATUSES: { [key: string]: string } = {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED',
};
export const CUSTOMER_STATUSES: { [key: string]: string } = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
};

export const CREATED_BY: { [key: string]: string } = {
  API: 'API',
  SYSTEM: 'SYSTEM',
};
