import { Select } from "./../models/common.model";
const VERSION = "";
export function createUrl(actionName: string, baseUrl): string {
    return `${baseUrl}${actionName}${VERSION}`;
}

export enum APP_CONST {
    CURRENT_USER = "_currentUser",
    SIDEBAR = "_sidebar",
    ACCESS_TOKEN = "_token",
    REFRESH_TOKEN = "_refresh_token",
    APP_NAME = "Rubix",
}

export const STATUS_LIST: Array<Select> = [
    { id: "ACTIVE", name: "Active" },
    { id: "IN_ACTIVE", name: "InActive" },
    { id: "LOCKED", name: "Locked" },
    { id: "PENDING", name: "Pending" },
];
export const GENDER_LIST: Array<Select> = [
    { id: "M", name: "Male" },
    { id: "F", name: "Female" },
];
export const WORKING_DAYS: Array<Select> = [
    { id: "SUNDAY", name: "SUNDAY" },
    { id: "MONDAY", name: "MONDAY" },
    { id: "TUESDAY", name: "TUESDAY" },
    { id: "WEDNESDAY", name: "WEDNESDAY" },
    { id: "THURSDAY", name: "THURSDAY" },
];

export const MODULES = {
    USER_MANAGEMENT: "User Management",
    ROLE_MANAGEMENT: "Role Management",
};
export const NATIONALITY_LIST: Array<Select> = [
    { id: "1", name: "Pakistan" },
    { id: "2", name: "Bahrain" },
    { id: "3", name: "Kuwait" },
];

const ENTITLEMENT = "api/v1/entitlements/";
const REFERENCE = "api/v1/references/";
const SERVICEREQUEST = "/requests/api/v1/service/request/";
const REFERRALREQUEST = 'customers/api/v1/customers/';

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
    LEAVES: `${ENTITLEMENT}leave-types`,
    COUNTRIES: `${REFERENCE}countries`,
    SERVICEREQUESTLIST: `${SERVICEREQUEST}user/all`,
    SERVICEREQUESTDETAILS: `${SERVICEREQUEST}`,
    SERVICEREQUESTUBDATESTATUS: `${SERVICEREQUEST}status/update`,
    REFERRAL: `${REFERRALREQUEST}referral`,
    REFERRALTRANSACTIONS: `${REFERRALREQUEST}referral/transactions`,
    TRANSACTIONSREPORT: `${REFERRALREQUEST}referral/transactions/excel/report`
};
