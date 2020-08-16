import * as DataLoader from 'dataloader';
import {Injectable, Scope} from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';

import {Permission} from "@app/v1/permissions/permission.model";
import {PermissionService} from "@app/v1/permissions/permissions.service";


@Injectable({ scope: Scope.REQUEST })
export class PermissionsDataLoader implements NestDataLoader<string, Permission> {
    constructor(private readonly permissionService: PermissionService) { }

    generateDataLoader(): DataLoader<string, Permission> {
        return new DataLoader<string, Permission>(keys => this.permissionService.findPermissionsByRoleID(keys));
    }
}
