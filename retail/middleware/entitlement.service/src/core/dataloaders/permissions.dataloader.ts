import * as DataLoader from 'dataloader';
import {Injectable} from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';

import {Permission} from "@app/v1/permissions/permission.model";
import {PermissionRepository} from '@core/repository';
import {loaderSerializer} from '@common/utilities';

@Injectable()
export class PermissionLoader {
    constructor(private readonly permissionDB: PermissionRepository) {}

    async findPermissionsByModuleID(keys): Promise<any> {
        const permissions: any = await this.permissionDB.listPermissionsByModuleID(keys);
        return loaderSerializer(permissions, keys, 'module_id')
    }
}

@Injectable()
export class PermissionsDataLoader implements NestDataLoader<string, Permission> {
    constructor(private readonly loader: PermissionLoader) { }

    generateDataLoader(): DataLoader<string, Permission> {
        return new DataLoader<string, Permission>(keys => this.loader.findPermissionsByModuleID(keys));
    }
}
