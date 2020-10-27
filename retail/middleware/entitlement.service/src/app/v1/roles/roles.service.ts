import { Injectable } from '@nestjs/common';

import { RoleRepository } from '@core/repository/role.repository';
import { STATUS } from '@common/constants';
import { KeyValInput } from '@common/inputs/key-val.input';
import { ICurrentUser } from '@common/interfaces';
import {Role, RolesWithPagination} from './role.model';
import { BadRequestException, RoleAlreadyExistsException } from './exceptions';
import { getCurrentTimeStamp } from '@common/utilities';
import {PaginationParams, SortingParam} from "@common/classes";
import {CreatedOnStartShouldBeLessThanEndException} from "@common/exceptions";
import {RolesFilterParams} from "@app/v1/roles/classes";

@Injectable()
export class RoleService {
  constructor(private roleDB: RoleRepository) {}

  async list(current_user: ICurrentUser,
             paginationParams: PaginationParams,
             filteringParams: RolesFilterParams,
             sortingParams: SortingParam,
             output: string[]): Promise<RolesWithPagination> {
    if(filteringParams.created_on && (new Date(filteringParams.created_on.start).getTime() > new Date(filteringParams.created_on.end).getTime())){
      throw new CreatedOnStartShouldBeLessThanEndException(filteringParams.created_on.start, filteringParams.created_on.end);
    }
    return this.roleDB.list(paginationParams, filteringParams, sortingParams,{ deleted_on: null, tenant_id: current_user.tenant_id }, output);
  }

  async findById(
    currentUser: ICurrentUser,
    id: string,
    output?: string[],
  ): Promise<Role> {
    const result = await this.roleDB.findOne(
      { tenant_id: currentUser.tenant_id, id: id, deleted_on: null },
      output,
    );
    return result;
  }

  async findByProperty(
    currentUser: ICurrentUser,
    checks: KeyValInput[],
    output?: string[],
  ): Promise<Role[]> {
    const conditions = {};
    checks.forEach(check => {
      conditions[check.record_key] = check.record_value;
    });
    conditions['tenant_id'] = currentUser.tenant_id;
    conditions['deleted_on'] = null;
    const result = await this.roleDB.findBy(conditions, output);
    return result;
  }

  async update(
    currentUser: ICurrentUser,
    id: string,
    roleObj: Record<string, any>,
    output?: string[],
  ): Promise<any> {
    if (roleObj.name && (await this.isNameTaken(currentUser, roleObj, id))) {
      throw new RoleAlreadyExistsException(roleObj.name);
    }
    const result = await this.roleDB.update(
      { id: id, tenant_id: currentUser.tenant_id, deleted_on: null },
      { ...roleObj, updated_by: currentUser.id },
      output,
    );
    if (result?.length > 0) {
      return result[0];
    } else {
      throw new BadRequestException();
    }
  }

  async create(
    currentUser: ICurrentUser,
    newRole: Record<string, any>,
    output?: string[],
  ): Promise<Role> {
    if (!newRole.status) {
      newRole.status = STATUS.ACTIVE;
    }
    newRole = {
      ...newRole,
      tenant_id: currentUser.tenant_id,
      created_by: currentUser.id,
      updated_by: currentUser.id,
    };
    if (newRole.name && (await this.isNameTaken(currentUser, newRole))) {
      throw new RoleAlreadyExistsException(newRole.name);
    }
    const [result] = await this.roleDB.create(newRole, output);
    return result;
  }

  async delete(
    currentUser: ICurrentUser,
    id: string,
    input: Role,
  ): Promise<boolean> {
    input = {
      ...input,
      deleted_by: currentUser.id,
      deleted_on: getCurrentTimeStamp(),
    };
    const result = await this.update(currentUser, id, input, ['id']);
    return !!result;
  }

  async isNameTaken(
    currentUser: ICurrentUser,
    role: Record<any, any>,
    id?: string,
  ): Promise<boolean> {
    const checks: KeyValInput[] = [
      {
        record_key: 'name',
        record_value: role.name,
      },
    ];
    const role_a = await this.findByProperty(currentUser, checks, [
      'id',
      'name',
    ]);
    if (role_a?.length && role_a.length > 0) {
      return !(id && role_a[0].id == id);
    }
    return false;
  }
}
