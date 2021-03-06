export const X_CORRELATION_KEY = 'x-correlation-id';
export const X_CHANNEL_KEY = 'x-channel-id';
export const X_ACCESS_TOKEN = 'x-access-token';
export const X_REFRESH_TOKEN = 'x-refresh-token';
export const X_USER_ID = 'x-user-id';
export const X_TENANT_ID = 'x-tenant-id';
export const MODULE_STATUSES: string[] = ['ACTIVE', 'INACTIVE'];
export const ROLE_STATUSES: string[] = ['ACTIVE', 'INACTIVE'];
export const USER_STATUSES: { [key: string]: string } = {
  PENDING: 'PENDING',
  LOCKED: 'LOCKED',
  COMPLETED: 'COMPLETED',
};

export const GENDER: string[] = ['M', 'F'];

export const DOCUMENT_TYPES: { [key: string]: string } = {
  SELFIE: 'SELFIE',
  LIVENESS: 'LIVENESS',
  PASSPORT: 'PASSPORT',
  DRIVING_LICENSE: 'DRIVING_LICENSE',
  NATIONAL_ID_FRONT_SIDE: 'NATIONAL_ID_FRONT_SIDE',
  NATIONAL_ID_BACK_SIDE: 'NATIONAL_ID_BACK_SIDE',
};

export const SELFIE_SUB_TYPES: { [key: string]: string } = {
  SELFIE: 'SELFIE',
  DEVICE_REGISTRATION: 'DEVICE_REGISTRATION',
};

export const DOCUMENT_STATUSES = {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  PROCESSED: 'PROCESSED',
  FAILED: 'FAILED',
  ARCHIVED: 'ARCHIVED',
};

export const EVALUATION_STATUSES = {
  MATCH: 'MATCH',
  MISMATCH: 'MISMATCH',
  CUSTOMER_SELFIE_MISMATCHED: 'CUSTOMER_SELFIE_MISMATCHED',
};

export const AML_STATUSES: { [key: string]: string } = {
  CLEAN: 'CLEAN',
  SUSPECT: 'SUSPECT',
  BLOCK: 'BLOCK',
};

export const OTP_STATUSES: { [key: string]: string } = {
  PENDING: 'PENDING',
  VERIFIED: 'OTP_VERIFIED',
  NOT_VERIFIED: 'NOT_VERIFIED',
};

export const SESSION_STATUSES: { [key: string]: string } = {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED',
};

export const DELIVERY_MODES: { [key: string]: string } = {
  EMAIL: 'email',
  MOBILE: 'mobile',
  BOTH: 'both',
};

export const STATUSES: { [key: string]: string } = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

export const CONTEXT_NAMESPACE_ID = 'a6a29a6f-6747-4b5f-b99f-07ee96e32f88';
export const DAY_FORMAT = 'MM/DD/YYYY';
export const HOUR_FORMAT = 'HH';
export const DAY_WITH_HOUR_FORMAT = 'MM/DD/YYYY HH';
export const PAGINATION_OUTPUT = ` {
  total
  pages
  pageSize
  page
}`;
export const DEVICES: string[] = ['ios', 'andriod'];

export const ATTACHMENT_TYPES: string[] = [
  'PASSPORT_SCREENSHOT',
  'ADDRESS_SCREENSHOT',
  'NATIONAL_ID_FRONT_SIDE_SCREENSHOT',
  'NATIONAL_ID_BACK_SIDE_SCREENSHOT',
  'VISA_SCREENSHOT',
];

export const NUMBERS = {
  MAX_COLUMN_LENGTH: 255,
  NATIONALITY_ID_LENGTH: 36,
  PLATEFORM_LENGTH: 10,
};

export const CUSTOMER_LAST_STEPS = {
  RBX_ONB_STEP_REG_INITIATED: 'RBX_ONB_STEP_REG_INITIATED',
  RBX_ONB_STEP_SELFIE_UPLOADED: 'RBX_ONB_STEP_SELFIE_UPLOADED',
  RBX_ONB_STEP_LIVENESS_UPLOADED: 'RBX_ONB_STEP_LIVENESS_UPLOADED',
  RBX_ONB_STEP_NATIONAL_ID_FRONT_UPLOADED: 'RBX_ONB_STEP_NATIONAL_ID_FRONT_UPLOADED',
  RBX_ONB_STEP_NATIONAL_ID_BACK_UPLOADED: 'RBX_ONB_STEP_NATIONAL_ID_BACK_UPLOADED',
  RBX_ONB_STEP_PASSPORT_UPLOADED: 'RBX_ONB_STEP_PASSPORT_UPLOADED',
  RBX_ONB_STEP_DRIVING_LICENCE_UPLOADED: 'RBX_ONB_STEP_DRIVING_LICENCE_UPLOADED',
  RBX_ONB_STEP_NATIONAL_ID_FRONT_PROCESSED: 'RBX_ONB_STEP_NATIONAL_ID_FRONT_PROCESSED',
  RBX_ONB_STEP_NATIONAL_ID_BACK_PROCESSED: 'RBX_ONB_STEP_NATIONAL_ID_BACK_PROCESSED',
  RBX_ONB_STEP_PASSPORT_PROCESSED: 'RBX_ONB_STEP_PASSPORT_PROCESSED',
  RBX_ONB_STEP_DRIVING_LICENCE_PROCESSED: 'RBX_ONB_STEP_DRIVING_LICENCE_PROCESSED',
  RBX_ONB_STEP_DOCUMENTS_MATCHED: 'RBX_ONB_STEP_DOCUMENTS_MATCHED',
  RBX_ONB_STEP_DOCUMENTS_MISMATCHED: 'RBX_ONB_STEP_DOCUMENTS_MISMATCHED',
  RBX_ONB_STEP_SMS_OTP_SENT: 'RBX_ONB_STEP_SMS_OTP_SENT',
  RBX_ONB_STEP_EMAIL_OTP_SENT: 'RBX_ONB_STEP_EMAIL_OTP_SENT',
  RBX_ONB_STEP_SMS_OTP_VERIFIED: 'RBX_ONB_STEP_SMS_OTP_VERIFIED',
  RBX_ONB_STEP_EMAIL_OTP_VERIFIED: 'RBX_ONB_STEP_EMAIL_OTP_VERIFIED',
  RBX_ONB_STEP_AML_SCREENING_SUCCESSFUL: 'RBX_ONB_STEP_AML_SCREENING_SUCCESSFUL',
  RBX_ONB_STEP_AML_SCREENING_FAILED: 'RBX_ONB_STEP_AML_SCREENING_FAILED',
  RBX_ONB_STEP_CRS_SUBMITTED: 'RBX_ONB_STEP_CRS_SUBMITTED',
  RBX_ONB_STEP_KYC_SUBMITTED: 'RBX_ONB_STEP_KYC_SUBMITTED',
  RBX_ONB_STEP_FATCA_SUBMITTED: 'RBX_ONB_STEP_FATCA_SUBMITTED',
  RBX_ONB_STEP_AGENT_VERIFICATION_SCHEDULED: 'RBX_ONB_STEP_AGENT_VERIFICATION_SCHEDULED',
  RBX_ONB_STEP_AGENT_VERIFICATION_SUCCESSFUL: 'RBX_ONB_STEP_AGENT_VERIFICATION_SUCCESSFUL',
  RBX_ONB_STEP_AGENT_VERIFICATION_FAILED: 'RBX_ONB_STEP_AGENT_VERIFICATION_FAILED',
};
