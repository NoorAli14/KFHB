import { registerEnumType } from '@nestjs/graphql';

export enum TABLE {
  APPOINTMENT = 'VC_APPOINTMENT',
  ATTACHMENT = 'VC_ATTACHMENT',
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

export const STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

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

export const ATTACHMENT_QUERY =
  'id tenant_id customer_id file_name file_size file_path attachment_id status created_on updated_on';

// This is for testing purposes
export const IMAGE_BASE64 =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAKBueIx4ZKCMgoy0qqC+8P//8Nzc8P//////////////////////////////////////////////////////////2wBDAaq0tPDS8P//////////////////////////////////////////////////////////////////////////////wAARCAGXANADASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAIBA//EAC0QAAICAgEDAgYBBAMAAAAAAAABAhESMSFBUWEDIhMyQnGBkaEjcrHBUtHw/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAGhEBAQEAAwEAAAAAAAAAAAAAABFBASGB0f/aAAwDAQACEQMRAD8A5gAAjaXdBbJfzMqKpd0KXdE4S7DCXYeHqqXdCl3RDTWwD1dLuhS7ogEF0u6FLuiABdLuhS7ogAXS7oUu6IAF0u6FLuiABdLuhS7ogAXS7oUu6IAF0u6DRBf0oowAEUAAGrZP1/kpbJup35Knx24Crqcvbd2w8W7sIep8xUpP04xUeLVtkSdvgrKMopStNdSNKhJS9ROuadmOF+rS0+fwYpRU1S4Sf3YXqJenX1avwB04frRrt/pkrJxlmuK6rqYppTi+yr+CPdJ1d/dgYt8nduV3GpR7HLBrl1S8opP01LJNrwBsL+G8eHYSbn76dKyVKLi1K1bvgKUYSTjbXWwHxW37la7FelN3XSmT/TTtW/BkJKMrfZgVCTlNX2YvD001t9SfTkoytmqUXDGVqtMDW8/Tbe11K9WKlr5l/giUoqGMfyxKf9TKID1dx+yH0oz1JKUk12N+lBGAAKAADVslxdspbD2VNTixiygRU4sYsoATixiygBOLGLKAE4sYsoATixiygBOLGLKAE4sYsoATixiygBOLK1FAPSKjAARQAAatm9TFsaZUbQoWLAwuUW8VSIOuSThz0IpGFKV0+DkdVjHL3J2cgAAAAAAAAAAAAAAAAAekA9IIwABQAAath7C2HsqaAAigAAAAAAAAAAAAAAAAAAAAAHpAPSKjAARQAAatm7Zi2bdMqFChYsHbCnBpJkl/TB9Ov7IqcZJXXAUZPSOj4bdP98EybqAEqLbpIYu6rk6Vblv7IfXH7Ac3FraNlBxSZqdxmJ3U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';
