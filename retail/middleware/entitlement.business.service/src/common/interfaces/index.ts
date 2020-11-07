import { X_CORRELATION_KEY, X_ENTITY_ID, X_TENANT_ID, X_USER_ID } from '../constants';

export * from './configuration.interface';
export interface ISERVICE {
  name: string;
  url: string;
}

export interface IHEADER {
  [X_ENTITY_ID]?: string;
  [X_USER_ID]?: string;
  [X_TENANT_ID]: string;
  [X_CORRELATION_KEY]: string;
}
