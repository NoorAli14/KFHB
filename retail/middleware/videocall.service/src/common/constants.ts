import { registerEnumType } from '@nestjs/graphql';

export enum TABLE {
  APPOINTMENT = 'VC_APPOINTMENT',
}

export const FOREIGN_KEYS = {
  Appointment: ['user_id'],
};

export enum GENDER {
  MALE = 'M',
  FEMALE = 'F',
}

export enum APPOINTMENT_STATUS {
  SCHEDULED = 'SCHEDULED',
  RESCHEDULED = 'RESCHEDULED',
  QUEUED = 'QUEUED',
  NOTIFICATION = 'NOTIFICATION',
  ATTENDED = 'ATTENDED',
  CANCELLED = 'CANCELLED',
}

registerEnumType(GENDER, { name: 'GENDER' });
registerEnumType(APPOINTMENT_STATUS, { name: 'APPOINTMENT_STATUS' });

export enum PLATFORMS {
  ANDROID = 'android',
  IOS = 'ios',
  WEB = 'web',
}

export const CREATED_BY: Record<string, string> = {
  SYSTEM: 'SYSTEM',
  API: 'API',
};

registerEnumType(PLATFORMS, { name: 'MOBILE_PLATFORMS' });

export const X_USER_ID = 'x-user-id';
export const X_TENANT_ID = 'x-tenant-id';
export const X_CORRELATION_KEY = 'x-correlation-id';
export const CONTEXT_NAMESPACE_ID = 'b6a29a6f-6747-4b5f-b99f-07ee96e32f11';
export const SEED_USER_ID = '7D55A5DB-739A-4B80-BD37-D3D30358D655';

export const DATABASE_MIGRATION_TABLE_NAME =
  process.env.DATABASE_MIGRATION_TABLE_NAME || 'RUBIX_VIDEO_MIGRATION';
export const DATABASE_MIGRATION_DIRECTORY = 'src/core/database/migrations';
export const DATABASE_SEED_DIRECTORY = 'src/core/database/seeds';

export const APPOINTMENT_QUERY =
  'id call_time created_on created_by updated_on updated_by';
