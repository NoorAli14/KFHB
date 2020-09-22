export * from './configuration.interface';
export interface ISERVICE {
  name: string;
  url: string;
}

export interface IHEADER {
  'x-user-id'?: string;
  'x-tenant-id': string;
  'x-correlation-id': string;
}
