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
}
export const MESSAGES = {
    UNKNOWN: "We are unable to process the request.",
    REMOVE_CONFIRMATION: "Are you sure you want to delete?",
    INVALID_CREDENTIAL: "Username or password is incorrect",
    LOGGED_IN: "You have successfully logged in. Taking you to portal",
    CREATED: (name) => `${name} created successfully.`,
};
