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
                        url      : '/user',
                    },
                    {
                        id       : 'role',
                        title    : 'Role',
                        translate: 'FEATURES.ENTITLEMENT.ROLE.TITLE',
                        type     : 'item',
                        icon     : 'security',
                        url      : '/role',
                    }
                ]
            }]
        
    }
];
