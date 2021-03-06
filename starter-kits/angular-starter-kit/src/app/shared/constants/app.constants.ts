import { environment } from "@env/environment";
const VERSION = "";
export function createUrl(actionName: string): string {
    return `${environment.API_BASE_URL}${actionName}${VERSION}`;
}

export enum USER_CONST {
    CURRENT_USER = "_currentUser",
    ACCESS_TOKEN = "_token",
    REFRESH_TOKEN = "_refresh_token",
    IS_LOGGED_IN = "_isLoggedIn",
    USER_NAME = "_userName",
    PERMISSIONS = "_permissions",
}
export const MESSAGES = {
    UNKNOWN: "We are unable to process the request.",
    REMOVE_CONFIRMATION: "Are you sure you want to delete?",
    CREATED: (name) => `${name} created successfully.`,
};
