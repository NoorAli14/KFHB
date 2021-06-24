import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    
    {
        id       : 'features',
        title    : 'Features',
        translate: 'FEATURES.TITLE',
        type     : 'group',
        children : [
            {
                id       : 'system-management',
                title    : 'SYSTEM MANAGEMENET',
                translate: 'FEATURES.SYSTEM_MANAGEMENT.TITLE',
                type     : 'collapsable',
                icon     : 'assignment_ind',
                children : [
                    {
                        id       : 'logs',
                        title    : 'Logs',
                        translate: 'FEATURES.SYSTEM_MANAGEMENT.LOGS.TITLE',
                        type     : 'item',
                        icon     : 'person',
                        url      : '/system',
                    }
                ]
            },
            {
                id       : 'entitlement',
                title    : 'Entitlement',
                translate: 'FEATURES.ENTITLEMENT.TITLE',
                type     : 'collapsable',
                icon     : 'assignment_ind',
                children : [
                    {
                        id       : 'user',
                        title    : 'User',
                        translate: 'FEATURES.ENTITLEMENT.USER.TITLE',
                        type     : 'item',
                        icon     : 'person',
                        url      : '/ent/user',
                    },
                    {
                        id       : 'config',
                        title    : 'Configuration',
                        translate: 'FEATURES.ENTITLEMENT.CONFIG.TITLE',
                        type     : 'item',
                        icon     : 'settings_applications',
                        url      : '/ent/config',
                    }
                ]
            },
            {
                id       : 'calender',
                title    : 'Calender',
                translate: 'FEATURES.CALENDER.TITLE',
                type     : 'collapsable',
                icon     : 'calendar_today',
                children : [
                    {
                        id       : 'working_days',
                        title    : 'Working Days',
                        translate: 'FEATURES.CALENDER.WORKING_DAYS.TITLE',
                        type     : 'item',
                        icon     : 'calendar_today',
                        url      : '/calender/working-days',
                    },
                    {
                        id       : 'config',
                        title    : 'Configuration',
                        translate: 'FEATURES.CALENDER.HOLIDAYS.TITLE',
                        type     : 'item',
                        icon     : 'calendar_today',
                        url      : '/calender/holidays',
                    }
                ]
            },
            {
                id       : 'service_requests',
                title    : 'Service Requests',
                translate: 'FEATURES.SERVICE_REQUESTS.TITLE',
                type     : 'item',
                icon     : 'calendar_today',
                url      : '/service-request',
            },
            {
                id       : 'referrals',
                title    : 'Referrals',
                translate: 'FEATURES.REFERRALS.TITLE',
                type     : 'item',
                icon     : 'calendar_today',
                url      : '/referrals',
            },
            {
                id       : 'international',
                title    : 'International Transfer Requests',
                translate: 'FEATURES.INTERNATIONALTRANSFERREQUEST.TITLE',
                type     : 'item',
                icon     : 'calendar_today',
                url      : '/international-transfer-requests',
            },
            {
                id       : 'finance-application',
                title    : 'Finance Application',
                translate: 'FEATURES.FINANCE_APPLICATION.TITLE',
                type     : 'item',
                icon     : 'account_balance',
                url      : '/finance',
            },
]
        
    }
];
