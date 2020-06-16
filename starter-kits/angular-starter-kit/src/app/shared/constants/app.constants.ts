import { environment } from '../../../environments/environment';
const VERSION = '/1.0';
export function createUrl(actionName: string): string {
  return `${environment.API_BASE_URL}${actionName}${VERSION}`;
}

export const appApiResources = {
  baseUrl: environment.API_BASE_URL,
};
export enum USER_CONST {
  CURRENT_USER = '_currentUser',
  ACCESS_TOKEN = '_token',
  REFRESH_TOKEN = '_refresh_token',
  IS_LOGGED_IN = '_isLoggedIn',
  USER_NAME = '_userName',
  PERMISSIONS = '_permissions'
}
export const appRoutes = {
  root: '',
  logout: 'logout',
  auth: 'auth',
  setting: 'setting',
  accessDenied: 'access-denied'
};
export const MESSAGES = {
  UNKNOWN: 'System cannot process the request!',
  REMOVED: (value) => `${value} Removed Successfully.`,
  INSERTED: (value) => `${value} Created Successfully.`,
  UPDATED: (value) => `${value} Updated Successfully.`,
  LOGIN_SUCCESS: 'Logged In. Taking You To The Portal.',
  USER_NOT_FOUND: 'User Not Found',
  FORGET_PASSWORD_SUCCESS: 'Reset Password link send to your email. Open that link to reset your password',
  UPDATE_PASSWORD_SUCCESS: 'Password updated successfully',
  INVALID_RESET_TOKEN: 'Invalid Reset Password Token',
  RESET_TOKEN_EXPIRED: 'Reset Password Token Expired',
  CONFIRMATION: 'Are you sure?',
  CANT_BE_INACTIVE: 'Status cannot be Inactive',
  USER_NAME_EXIST: 'This Username already exists.',
  THUMBNAIL_NOT_FOUND: 'Thumbnail does not exist.'
};


