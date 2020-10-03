export const MESSAGES = {
    UNKNOWN: () => `We are unable to process the request. ${getRandomNumber()}`,
    REMOVE_CONFIRMATION: () => `Are you sure you want to delete?`,
    RESEND_INVITE: () => `Are you sure you want to resend invitation?`,
    INVITE_RESENT: () => `Invitation link has been sent to user email? ${getRandomNumber()}`,
    INVALID_CREDENTIAL: () => `Email or password is incorrect. ${getRandomNumber()}`,
    LOGGED_IN: () => `You have successfully logged in. Taking you to portal. ${getRandomNumber()}`,
    PASSWORD_RESET_SENT: () => `Reset password link has been sent to your email. ${getRandomNumber()}`,
    PASSWORD_UPDATED: () => `Your password has been updated. ${getRandomNumber()}`,
    INVALID_RESET_TOKEN: () => `Reset password token is invalid. ${getRandomNumber()}`,
    INVITATION_SENT: () => `User created successfully. Invitation link has been sent to user email. ${getRandomNumber()}`,
    INVALID_INVITATION: () => `Invitation link is invalid. ${getRandomNumber()}`,
    ALREADY_ONBOARD: () => `You have already been on boarded.`,
    CREATED: (name) => `${name} created successfully. ${getRandomNumber()}`,
    DELETED: (name) => `${name} deleted successfully. ${getRandomNumber()}`,
    UPDATED: (name) => `${name} updated successfully. ${getRandomNumber()}`,
    INVITATION_ACCEPTED: () => `Your profile updated successfully. Login to continue. ${getRandomNumber()}`,
    CUSTOM: (message) => `${message} ${getRandomNumber()}`,
    EXISTS: (type) => `${type} already exists. ${getRandomNumber()}`,
};
const getRandomNumber = () => {
    return Math.floor(Math.random() * 11);
};
