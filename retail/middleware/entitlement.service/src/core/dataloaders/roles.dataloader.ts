import * as DataLoader from "dataloader";
import {Injectable} from "@nestjs/common";
import { NestDataLoader } from "nestjs-dataloader";

import {Role} from "@app/v1/roles/role.model";
import {RoleRepository} from '@core/repository';


@Injectable()
export class RolesDataLoader implements NestDataLoader<string, Role> {
    constructor(private readonly roleDB: RoleRepository) { }

    generateDataLoader(): DataLoader<string, Role> {
        return new DataLoader<string, Role>(keys => this.roleDB.listRolesByUserID(keys));
    }
}
