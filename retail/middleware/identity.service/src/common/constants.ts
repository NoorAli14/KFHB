export const TABLE: { [key: string]: string } = {
  SESSION: 'IDT_SESSION',
  DOCUMENT_TYPE: 'IDT_DOCUMENT_TYPE',
  CUSTOMER: 'IDT_CUSTOMER',
  SESSION_REFERENCE: 'IDT_SESSION_REFERENCE',
};

export const DATABASE_UUID_METHOD: string = 'NEWID()';
export const DATABASE_MIGRATION_TABLE_NAME: string =
  'RUBIX_IDENTITY_MIGRATIONS';
export const DATABASE_MIGRATION_DIRECTORY: string =
  'src/core/database/migrations';
export const DATABASE_SEED_DIRECTORY: string = 'src/core/database/seeds';
export const X_USER_ID: string = 'x-user-id';
export const X_TENANT_ID: string = 'x-tenant-id';
export const X_CORRELATION_KEY: string = 'x-correlation-id';

export const DOCUMENT_TYPES = {
  SELFIE: 'SELFIE',
  LIVENESS: 'LIVENESS',
  PASSPORT: 'PASSPORT',
  DRIVING_LICENSE: 'DRIVING_LICENSE',
  NATIONAL_ID_FRONT_SIDE: 'NATIONAL_ID_FRONT_SIDE',
  NATIONAL_ID_BACK_SIDE: 'NATIONAL_ID_BACK_SIDE',
};

export const SEED_DOCUMENTS_lIST = [{
  name: DOCUMENT_TYPES.SELFIE,
  record_type: 'FACE',
  is_required: true
}, {
  name: DOCUMENT_TYPES.LIVENESS,
  record_type: 'FACE',
  is_required: true
}, {
  name: DOCUMENT_TYPES.PASSPORT,
  record_type: 'DOCUMENT',
  is_required: true
}, {
  name: DOCUMENT_TYPES.NATIONAL_ID_BACK_SIDE,
  record_type: 'DOCUMENT',
  is_required: true
}, {
  name: DOCUMENT_TYPES.DRIVING_LICENSE,
  record_type: 'DOCUMENT',
  is_required: true
}, {
  name: DOCUMENT_TYPES.NATIONAL_ID_FRONT_SIDE,
  record_type: 'DOCUMENT',
  is_required: false
}];

export const DOCUMENT_TYPE_STATUSES: { [key: string]: string } = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

export const SESSION_STATUSES: { [key: string]: string } = {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED',
};
export const CUSTOMER_STATUSES: { [key: string]: string } = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
};

export const DOCUMENT_STATUSES: { [key: string]: string } = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  PROCESSED: 'PROCESSED',
  FAILED: 'FAILED',
  ARCHIVED: 'ARCHIVED',
};

export const CREATED_BY: { [key: string]: string } = {
  API: 'API',
  SYSTEM: 'SYSTEM',
};

export const PAGINATION_PARAMS = {
  PAGE: 'page',
  PER_PAGE: 'perPage',
};

export const NUMBERS = {
  DEFAULT_PAGE_SIZE: 25,
};
