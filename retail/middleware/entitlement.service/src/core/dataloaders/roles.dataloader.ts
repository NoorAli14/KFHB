import * as DataLoader from "dataloader";
import {Injectable} from "@nestjs/common";
import { NestDataLoader } from "nestjs-dataloader";

import {Role} from "@app/v1/roles/role.model";
import {RoleRepository} from '@core/repository';
import {loaderSerializer} from '@common/utilities';

@Injectable()
export class RolesLoader {
    constructor(private readonly roleDB: RoleRepository) {}

    async findRolesByUserID(keys): Promise<any> {
        const roles = await this.roleDB.listRolesByUserID(keys);
        return loaderSerializer(roles, keys, 'user_id')
    }
}

@Injectable()
export class RolesDataLoader implements NestDataLoader<string, Role> {
    constructor(private readonly loader: RolesLoader) { }

    generateDataLoader(): DataLoader<string, Role> {
        return new DataLoader<string, Role>(keys => this.loader.findRolesByUserID(keys));
    }
}
