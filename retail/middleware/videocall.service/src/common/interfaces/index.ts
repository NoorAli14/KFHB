export * from './configuration.interface';
export * from './current_user.interface';
export * from './tenant.interface';

export interface IHEADER {
  'x-user-id'?: string;
  'x-tenant-id': string;
  'x-correlation-id': string;
}
