import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    
    {
        id       : 'features',
        title    : 'Features',
        translate: 'FEATURES.TITLE',
        type     : 'group',
        children : [
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
            }]
        
    }
];
