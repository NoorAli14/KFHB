export const MESSAGES = {
    UNKNOWN:  `We are unable to process the request. `,
    REMOVE_CONFIRMATION: `Are you sure you want to delete?`,
    RESEND_INVITE:  `Are you sure you want to resend invitation?`,
    INVITE_RESENT: `Invitation link has been sent to user email. `,
    INVALID_CREDENTIAL: () => `Email or password is incorrect. ${getRandomNumber()}`,
    LOGGED_IN: () => `You have successfully logged in. Taking you to portal. ${getRandomNumber()}`,
    PASSWORD_RESET_SENT: () => `Reset password link has been sent to your email. ${getRandomNumber()}`,
    PASSWORD_UPDATED: `Your password has been updated. `,
    INVALID_RESET_TOKEN: () => `Reset password token is invalid. ${getRandomNumber()}`,
    INVITATION_SENT: `User created successfully. Invitation link has been sent to user email. `,
    INVALID_INVITATION: () => `Invitation link is invalid. ${getRandomNumber()}`,
    ALREADY_ONBOARD:  `You have already been on boarded.`,
    CREATED: (name) => `${name} created successfully.`,
    DELETED: (name) => `${name} deleted successfully. `,
    UPDATED: (name) => `${name} updated successfully. `,
    INVITATION_ACCEPTED: () => `Your profile updated successfully. Login to continue. ${getRandomNumber()}`,
    CUSTOM: (message) => `${message} ${getRandomNumber()}`,
    EXISTS: (type) => `${type} already exists. `,
    INVALID_DATE:`Date is invalid`,
     CHANGE_STATUS: (status) => `Are you sure you want to ${status} ?`,
};
const getRandomNumber = () => {
    return Math.floor(Math.random() * 11);
};
