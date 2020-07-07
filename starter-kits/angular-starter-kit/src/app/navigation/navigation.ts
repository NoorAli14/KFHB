import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'features',
        title    : 'Features',
        translate: 'NAV.FEATURES',
        type     : 'group',
        children : [
            {
                id       : 'user',
                title    : 'User',
                translate: 'NAV.USER.TITLE',
                type     : 'item',
                icon     : 'person',
                url      : '/user',
            },
            {
                id       : 'role',
                title    : 'Role',
                translate: 'NAV.ROLE.TITLE',
                type     : 'item',
                icon     : 'security',
                url      : '/role',
            }
        ]
    }
];
