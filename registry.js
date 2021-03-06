export const SERVICES = {
    'api/v1/entitlements/auth': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/entitlements/users': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/entitlements/invitations': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/entitlements/roles': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/entitlements/modules': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/entitlements/permissions': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/entitlements/customers': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/entitlements/working-days': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/entitlements/holidays': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/entitlements/leave-types': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/entitlements/leaves': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/onboarding/auth': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/onboarding/sessions': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/onboarding/evaluations': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/onboarding/faces': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/onboarding/attachments': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/onboarding/documents': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/onboarding/otp': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/onboarding/compliances': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/references/countries': { "channels": ['RUBIX-DEV-INT'] },
    'api/v1/references/currencies': { "channels": ['RUBIX-DEV-INT'] },
}

export const GQL_SERVICES = [
    {
        "name": "notification_service",
        "host_name": "notification_service",
        "port": 5030,
        "version": "1.0",
        "context": "/graphql",
        "is_secure": false,
    },
    {
        "name": "user_management_service",
        "host_name": "user_management_service",
        "port": 5020,
        "version": "1.0",
        "context": "/graphql",
        "is_secure": false,
    },
    {
        "name": "identity_service",
        "host_name": "identity_service",
        "port": 4010,
        "version": "1.0",
        "context": "/graphql",
        "is_secure": false,
    },
    {
        "name": "compliance_service",
        "host_name": "compliance_service",
        "port": 5010,
        "version": "1.0",
        "context": "/graphql",
        "is_secure": false,
    }
]

export function getService(name) {
    let service = GQL_SERVICES.find(service => service.name === name);
    if (!service) throw new Error('SERVICE_NOT_FOUND');
    return {
        ...service,
        url: formatUrl(service),
    }
}

export function formatUrl(service) {
    if (!service) throw new Error('SERVICE_NOT_FOUND');
    return `${service.is_secure ? 'https' : 'http'}://${service.host_name}:${service.port}/${service.context}`;
}

export function isAuthorizedChannel(url, channelName) {
    const service = SERVICES[url];
    return service?.channels?.includes(channelName);
}