import { environment } from '@env/environment';
const VERSION = '/1.0';
export function createUrl(actionName: string): string {
  return `${environment.API_BASE_URL}${actionName}${VERSION}`;
}

export const appApiResources = {
  baseUrl: environment.API_BASE_URL,
  tokenvalidity: createUrl('auth/tokenvalidity'),
  login: createUrl('fs/bs/db.ascusers/login/1.0'),
  getGateway: createUrl('fs/bs/db.cdtauthorities/gateway/1.0/'),
  getChannel: createUrl('api/fs/bs/db.cdtauthorities/channel/INT/1.0'),
  createChannel: createUrl('api/fs/bs/db.cdtauthorities/channel/1.0'),
  deleteChannel: createUrl('api/fs/bs/db.cdtauthorities/channel/dev2/1.0'),
  getService: createUrl(
    'api/fs/bs/db.cdtauthorities/service/957FF4C336533E5E5E05011AC0200025E/1.0'
  ),
  createService: createUrl('api/fs/bs/db.cdtauthorities/service/1.0'),
  deleteService: createUrl('api/fs/bs/db.cdtauthorities/channel/dev2/1.0')
};
export enum USER_CONST {
  CURRENT_USER = '_currentUser',
  ACCESS_TOKEN = '_token',
  REFRESH_TOKEN = '_refresh_token',
  IS_LOGGED_IN = '_isLoggedIn',
  USER_NAME = '_userName',
  PERMISSIONS = '_permissions'
}




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


