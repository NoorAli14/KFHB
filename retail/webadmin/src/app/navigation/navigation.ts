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
            }]
        
    }
];
