import * as DataLoader from 'dataloader';
import {Injectable, Scope} from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import {RoleService} from "@app/v1/roles/roles.service";
import {Role} from "@app/v1/roles/role.model";


@Injectable({ scope: Scope.REQUEST })
export class RolesDataLoader implements NestDataLoader<string, Role> {
    constructor(private readonly roleService: RoleService) { }

    generateDataLoader(): DataLoader<string, Role> {
        return new DataLoader<string, Role>(keys => this.roleService.findRolesByUserID(keys));
    }
}
