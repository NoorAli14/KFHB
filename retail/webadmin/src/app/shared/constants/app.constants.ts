import { Select } from './../models/common.model';
import { environment } from '@env/environment';
const VERSION = '';
export function createUrl(actionName: string): string {
    return `${environment.API_BASE_URL}${actionName}${VERSION}`;
}

export const DATE_FORMAT = 'YYYY-MM-DD';
export enum APP_CONST {
    CURRENT_USER = '_currentUser',
    SIDEBAR = '_sidebar',
    ACCESS_TOKEN = '_token',
    REFRESH_TOKEN = '_refresh_token',
    APP_NAME = 'Rubix',
}

export const STATUS_LIST: Array<Select> = [
    { id: 'ACTIVE', name: 'Active' },
    { id: 'IN_ACTIVE', name: 'In Active' },
    { id: 'LOCKED', name: 'Locked' },
    { id: 'PENDING', name: 'Pending' },
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

export const MODULES = {
    USER_MANAGEMENT: 'User Management',
    ROLE_MANAGEMENT: 'Role Management',
    WORKING_WEEK: 'Working Week',
    LEAVES: 'Leaves',
    HOLIDAYS: 'Holidays',
};
export const NATIONALITY_LIST: Array<Select> = [
    { id: '1', name: 'Pakistan' },
    { id: '2', name: 'Bahrain' },
    { id: '3', name: 'Kuwait' },
];

const ENTITLEMENT = '/api/v1/entitlements/';
const REFERENCE = '/api/v1/references/';
const ONBOARDING = '/api/v1/onboarding/';

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
    CUSTOMER360: `${ENTITLEMENT}customers`,
};

export const DEFAULT_IMAGE='assets/images/default.png'