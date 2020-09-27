import { registerEnumType } from '@nestjs/graphql';

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
  QUEUED = 'queued',
  NOTIFICATION = 'notification',
  ATTENDED = 'attended',
  CANCELLED = 'cancelled',
}
registerEnumType(GENDER, { name: 'GENDER' });
registerEnumType(APPOINTMENT_STATUS, { name: 'APPOINTMENT_STATUS' });

export enum PLATFORMS {
  ANDROID = 'android',
  IOS = 'ios',
  WEB = 'web',
}
registerEnumType(PLATFORMS, { name: 'MOBILE_PLATFORMS' });

export const DATABASE_UUID_METHOD = (): string => 'NEWID()';

export declare const X_USER_ID = 'x-user-id';
export declare const X_TENANT_ID = 'x-tenant-id';
export declare const X_CORRELATION_KEY = 'x-correlation-id';
export const CONTEXT_NAMESPACE_ID = 'a6a29a6f-6747-4b5f-b99f-07ee96e32f00';
export const SEED_USER_ID = '7D55A5DB-739A-4B80-BD37-D3D30358D655';

export const DATABASE_MIGRATION_TABLE_NAME =
  process.env.DATABASE_MIGRATION_TABLE_NAME || 'RUBIX_VIDEO_MIGRATION';
export const DATABASE_MIGRATION_DIRECTORY = 'src/core/database/migrations';
export const DATABASE_SEED_DIRECTORY = 'src/core/database/seeds';
