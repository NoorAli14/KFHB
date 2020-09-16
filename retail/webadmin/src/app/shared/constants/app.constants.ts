import { Select } from "./../models/common.model";
import { environment } from "@env/environment";
const VERSION = "";
export function createUrl(actionName: string): string {
    return `${environment.API_BASE_URL}${actionName}${VERSION}`;
}

export enum APP_CONST {
    CURRENT_USER = "_currentUser",
    SIDEBAR = "_sidebar",
    ACCESS_TOKEN = "_token",
    REFRESH_TOKEN = "_refresh_token",
    APP_NAME = "Rubix",
}

const getRandomNumber = () => {
    return Math.floor(Math.random() * 11);
};
export const MESSAGES = {
    UNKNOWN:()=> `We are unable to process the request. ${getRandomNumber()}`,
    REMOVE_CONFIRMATION:()=> `Are you sure you want to delete? ${getRandomNumber()}`,
    RESEND_INVITE:()=> `Are you sure you want to resend invitation? ${getRandomNumber()}`,
    INVITE_RESENT:()=> `Invitation link has been sent to user email? ${getRandomNumber()}`,
    INVALID_CREDENTIAL:()=> `Email or password is incorrect. ${getRandomNumber()}`,
    LOGGED_IN:()=> `You have successfully logged in. Taking you to portal. ${getRandomNumber()}`,
    PASSWORD_RESET_SENT:()=> `Reset password link has been sent to your email. ${getRandomNumber()}`,
    PASSWORD_UPDATED:()=> `Your password has been updated. ${getRandomNumber()}`,
    INVALID_RESET_TOKEN:()=> `Reset password token is invalid. ${getRandomNumber()}`,
    INVITATION_SENT:()=> `User created successfully. Invitation link has been sent to user email. ${getRandomNumber()}`,
    ALREADY_ONBOARD:()=> `You have already been on boarded.`,
    CREATED: (name) => `${name} created successfully. ${getRandomNumber()}`,
    DELETED: (name) => `${name} deleted successfully. ${getRandomNumber()}`,
    UPDATED: (name) => `${name} updated successfully. ${getRandomNumber()}`,
};

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

export const MODULES={
    USER_MANAGEMENT:'User Management',
    ROLE_MANAGEMENT:'Role Management',
}
export const NATIONALITY_LIST: Array<Select> = [
    { id: "1", name: "Pakistan" },
    { id: "2", name: "Bahrain" },
    { id: "3", name: "Kuwait" },
];

const URI_PREFIX = "/api/v1/entitlements/";

export const URI = {
    USER_INVITATION: `${URI_PREFIX}invitations`,
    USER: `${URI_PREFIX}users`,
    ROLE: `${URI_PREFIX}roles`,
    PERMISSION: `${URI_PREFIX}permissions`,
    MODULE: `${URI_PREFIX}modules`,
    LOGIN: `${URI_PREFIX}auth/login`,
    REFRESH: `${URI_PREFIX}auth/refresh-token`,
    LOGOUT: `${URI_PREFIX}auth/logout`,
    FORGOT_PASSWORD: `${URI_PREFIX}users/password`,
    RESET_PASSWORD: `${URI_PREFIX}`,
    WORKING_DAYS: `${URI_PREFIX}working-days`,
    HOLIDAYS: `${URI_PREFIX}holidays`,
};
