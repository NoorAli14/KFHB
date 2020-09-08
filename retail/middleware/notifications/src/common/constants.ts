export const TABLE = {
  USER: 'T_USER',
  OTP: 'NTF_OTP',
};
export const DATABASE_UUID_METHOD = 'NEWID()';

export const DATABASE_MIGRATION_TABLE_NAME = 'RUBIX_NOTIFICATION_MIGRATIONS';
export const DATABASE_MIGRATION_DIRECTORY = 'src/core/database/migrations';
export const DATABASE_SEED_DIRECTORY = 'src/core/database/seeds';

export const DEFAULT_SENDING_EMAIL = "rubix@aiondigital.com";
export const DEFAULT_SENDING_NAME = "Rubix Aion Digital";
export const DEFAULT_TEMPLATE_NAME = "default";
export const DEFAULT_OTP_STATUS = "Not Verified";
export const DEFAULT_OTP_DELIVERY_MODES = ['email','mobile','both'];
export const DEFAULT_OTP_PATTERN = '0';
export const DEFAULT_OTP_LENGTH = 6;
export const DEFAULT_OTP_DURATION = 1;
export const DEFAULT_OTP_EMAIL_TEMPLATE = "otp";
export const DEFAULT_OTP_EMAIL_SUBJECT="One time OTP";
export const DEFAULT_SMS_SENDER= "+015846598126";
export const DEFAULT_SMS_API_URL= "http://localhost:3002/sendsms";
export const DEFAULT_RUBIX_OTP_BY_API = false;
export const DEFAULT_HTTP_TIMEOUT = 5000;
export const DEFAULT_HTTP_MAX_REDIRECTS = 5;
