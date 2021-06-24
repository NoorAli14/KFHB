import { Select } from './../models/common.model';
import { environment } from '@env/environment';
const VERSION = '';
export function createRubixUrl(actionName: string): string {
    return `${environment.RETAIL_API_BASE_URL}${actionName}${VERSION}`;
}
export function createCorporateUrl(actionName: string): string {
    return `${environment.CORPORATE_API_BASE_URL}${actionName}${VERSION}`;
}
export function createRetailUrl(baseUrl, actionName: string): string {
    return `${baseUrl}${actionName}${VERSION}`;
}

export const DATE_FORMAT = 'YYYY-MM-DD';
export enum APP_CONST {
    CURRENT_USER = '_currentUser',
    SIDEBAR = '_sidebar',
    ACCESS_TOKEN = '_token',
    REFRESH_TOKEN = '_refresh_token',
    APP_NAME = 'Rubix',
}

export const CUSTOMER_STATUSES = {
    ACCEPTED: 'ACCEPTED',
    PENDING: 'PENDING',
    REJECTED:'REJECTED',
    REFER_TO_BUSINESS: 'REFER_TO_BUSINESS',
    DROPPED: 'DROPPED',
};

export const STATUS_LIST: Array<Select> = [
    { id: 'ACCEPTED', name: 'Accepted' },
    { id: 'PENDING', name: 'Pending' },
    { id: 'DROPPED', name: 'Dropped' },
    { id: 'REJECTED', name: 'Rejected' },
    { id: 'REFER_TO_BUSINESS', name: 'Refer to Business' },
    { id: 'RETRY', name: 'Retry'}
];

export const REMARKS_LIST = [
    { id: 'ACCEPTED', name: 'Accepted' },
    { id: 'REJECTED', name: 'Rejected' },
    { id: 'REFER_TO_BUSINESS', name: 'Refer to Business' },
    { id: 'DROPPED', name: 'Dropped' }];

export const AGENT_REMARKS = {
    FACE_MATCHED: 'FACE_MATCHED',
    FACE_MISMATCHED: 'FACE_MISMATCHED'
}
export const CORPORATE_REMARKS_LIST = [
    { id: AGENT_REMARKS.FACE_MATCHED, name: 'Face Matched' },
    { id: AGENT_REMARKS.FACE_MISMATCHED, name: 'Face Mismatch' }
];

export const GENDER_LIST: Array<Select> = [
    { id: 'M', name: 'Male' },
    { id: 'F', name: 'Female' },
];
export const WORKING_DAYS: Array<Select> = [
    { id: 'MONDAY', name: 'MONDAY' },
    { id: 'TUESDAY', name: 'TUESDAY' },
    { id: 'WEDNESDAY', name: 'WEDNESDAY' },
    { id: 'THURSDAY', name: 'THURSDAY' },
    { id: 'FRIDAY', name: 'FRIDAY' },
    { id: 'SATURDAY', name: 'SATURDAY' },
    { id: 'SUNDAY', name: 'SUNDAY' },
];
export const STATUS_CODE_LIST: Array<Select> = [
    { id: 'LOGIN_USER_SUCCESS', name: 'LOGIN_USER_SUCCESS' },
    { id: 'LOGIN_USER_FAILED', name: 'LOGIN_USER_FAILED' },
    { id: 'LOGOUT_USER_SUCCESS', name: 'LOGOUT_USER_SUCCESS' },
    { id: 'CREATE_USER_SUCCESS', name: 'CREATE_USER_SUCCESS' },
    { id: 'UPDATE_USER_SUCCESS', name: 'UPDATE_USER_SUCCESS' },
    { id: 'DELETE_USER_SUCCESS', name: 'DELETE_USER_SUCCESS' },
    { id: 'UPDATE_PASSWORD_SUCCESS', name: 'UPDATE_PASSWORD_SUCCESS' },
    { id: 'UPDATE_PASSWORD_FAILED', name: 'UPDATE_PASSWORD_FAILED' },
    { id: 'FORGET_PASSWORD_REQUEST_SUCCESS', name: 'FORGET_PASSWORD_REQUEST_SUCCESS' },
    { id: 'FORGET_PASSWORD_REQUEST_FAILED', name: 'FORGET_PASSWORD_REQUEST_FAILED' },
];

export const MODULES = {
    USER_MANAGEMENT: 'User Management',
    ROLE_MANAGEMENT: 'Role Management',
    WORKING_WEEK: 'Working Week',
    LEAVES: 'Leaves',
    HOLIDAYS: 'Holidays',
    SYSTEM_MANAGEMENT: 'System Management',
    CUSTOMERS: 'Customers',
};


const ENTITLEMENT = '/api/v1/entitlements/';
const REFERENCE = '/api/v1/references/';
const ONBOARDING = '/api/v1/onboarding/';
const SERVICEREQUEST = '/requests/api/v1/service/request/';
const REFERRALREQUEST = '/customers/api/v1/customers/';

export const URI = {
    USER_INVITATION: `${ENTITLEMENT}invitations`,
    USER: `${ENTITLEMENT}users`,
    ROLE: `${ENTITLEMENT}roles`,
    PERMISSION: `${ENTITLEMENT}permissions`,
    MODULE: `${ENTITLEMENT}modules`,
    LOGIN: `${ENTITLEMENT}auth/login`,
    REFRESH: `${ENTITLEMENT}auth/refresh-token`,
    LOGOUT: `${ENTITLEMENT}auth/logout`,
    FORGOT_PASSWORD: `${ENTITLEMENT}users/password`,
    RESET_PASSWORD: `${ENTITLEMENT}`,
    WORKING_DAYS: `${ENTITLEMENT}working-days`,
    HOLIDAYS: `${ENTITLEMENT}holidays`,
    LEAVE_TYPE: `${ENTITLEMENT}leave-types`,
    LEAVES: `${ENTITLEMENT}leaves`,
    COUNTRIES: `${REFERENCE}countries`,
    CUSTOMERS: `${ONBOARDING}customers`,
    CUSTOMER360: `${ONBOARDING}customers`,
    SYSTEM_AUDIT: `${ENTITLEMENT}audit/system`,
    AML: `${ONBOARDING}aml/`,
    COMPANY_DETAIL: `${ONBOARDING}company/company-information`,
    MEMBER_DETAIL: `${ONBOARDING}company/member/profile/id`,
    UPDATE_MEMBER: `${ONBOARDING}company/member`,
    COMPLIANCE_CRS: `${ONBOARDING}compliance-template/crs`,
    WORFLOW: {
        NEXT_TASK: `${ONBOARDING}workflow/task/user/:user_type/corporate/:corporate_id/var`,
        SUBMIT_TASK: `${ONBOARDING}workflow/cob_task/submit`,
    },
    SERVICE_REQUEST_LIST: `${SERVICEREQUEST}user/all`,
    SERVICE_REQUEST_DETAILS: `${SERVICEREQUEST}`,
    SERVICE_REQUEST_UBDATE_STATUS: `${SERVICEREQUEST}status/update`,
    SERVICE_REQUEST_REPORT: `${SERVICEREQUEST}excel/report`,
    REFERRAL: `${REFERRALREQUEST}referral`,
    REFERRAL_TRANSACTIONS: `${REFERRALREQUEST}referral/transactions`,
    REFERRAL_TRANSACTIONS_REPORT: `${REFERRALREQUEST}referral/transactions/excel/report`,
    FINANCE_APPLICATIONS: `/api/v1/finance`
};

export const DEFAULT_IMAGE = 'assets/images/not-available.png';

export const DATES = {
    DATE_FMT: 'mediumDate',
    DATE_TIME_FMT: `dd/MM/yy hh:mm a`
}

export const USER_TYPE = {
    AGENT: 'AGENT'
}