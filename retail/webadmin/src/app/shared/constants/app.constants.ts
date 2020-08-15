import { Select } from './../models/common.model';
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
    APP_NAME='Rubix'
}
export const MESSAGES = {
    UNKNOWN: "We are unable to process the request.",
    REMOVE_CONFIRMATION: "Are you sure you want to delete?",
    INVALID_CREDENTIAL: "Username or password is incorrect",
    LOGGED_IN: "You have successfully logged in. Taking you to portal",
    PASSWORD_RESET_SENT: "Reset password link has been sent to your email.",
    PASSWORD_UPDATED: "Your password has been updated.",
    INVALID_RESET_TOKEN: "Reset password token is invalid.",
    CREATED: (name) => `${name} created successfully.`,
    DELETED: (name) => `${name} deleted successfully.`,
    UPDATED: (name) => `${name} updated successfully.`,
};

export const STATUS_LIST: Array<Select> = [
    { id: "ACTIVE", name: "Active" },
    { id: "IN_ACTIVE", name: "In Active" },
    { id: "LOCKED", name: "Locked" },
    { id: "PENDING", name: "Pending" },
];
export const GENDER_LIST: Array<Select> = [
    { id: 'M', name: "Male" },
    { id: 'F', name: "Female" },
];

export const NATIONALITY_LIST: Array<Select> = [
    { id: 1, name: "Pakistan" },
    { id: 2, name: "Bahrain" },
    { id: 3, name: "Kuwait" },
];
