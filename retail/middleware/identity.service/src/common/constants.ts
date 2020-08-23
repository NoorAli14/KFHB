export const TABLE = {
  SESSION: 'IDT_SESSION',
  DOCUMENT_TYPE: 'IDT_DOCUMENT_TYPE',
  POST: 'T_POST',
  COMMENT: 'T_COMMENT',
};

export const DATABASE_UUID_METHOD = 'NEWID()';
export const DATABASE_MIGRATION_TABLE_NAME = 'RUBIX_IDENTITY_MIGRATIONS';
export const DATABASE_MIGRATION_DIRECTORY = 'src/core/database/migrations';
export const DATABASE_SEED_DIRECTORY = 'src/core/database/seeds';
export const DOCUMENT_TYPES = [
  'SELFIE',
  'LIVENESS',
  'PASSPORT',
  'DRIVING_LICENSE',
  'FRONT_SIDE',
  'BACK_SIDE',
];
