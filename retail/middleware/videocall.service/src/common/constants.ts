export enum TABLE {
  APPOINTMENT = 'VC_APPOINTMENT',
}

export const FOREIGN_KEYS = {
  AppointmentGQL: ['user_id'],
};

export enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
}

export enum APPOINTMENT_STATUS {
  SCHEDULED = 'scheduled',
  RESCHEDULED = 'rescheduled',
  ATTENDED = 'attended',
  CANCELLED = 'cancelled',
}

export const DATABASE_UUID_METHOD = 'NEWID()';

export const DATABASE_MIGRATION_TABLE_NAME =
  process.env.DATABASE_MIGRATION_TABLE_NAME || 'RUBIX_VIDEO_MIGRATION';
export const DATABASE_MIGRATION_DIRECTORY = 'src/core/database/migrations';
export const DATABASE_SEED_DIRECTORY = 'src/core/database/seeds';
