import { Injectable } from '@nestjs/common';

import { RoleRepository } from '@core/repository/role.repository';
import { STATUS } from '@common/constants';
import { KeyValInput } from '@common/inputs/key-val.input';
import { ICurrentUser, ITenant } from '@common/interfaces';
import { Role } from './role.model';
import { BadRequestException, RoleAlreadyExistsException } from './exceptions';
import { getCurrentTimeStamp } from '@common/utilities';

@Injectable()
export class RoleService {
  constructor(private roleDB: RoleRepository) {}

  async list(
    output: string[],
    paginationParams: Record<string, any>,
  ): Promise<any> {
    return this.roleDB.listWithPagination(paginationParams, output, {
      deleted_on: null,
    });
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
    if (roleObj.status && !STATUS[roleObj.status]) {
      throw new BadRequestException();
    }
    // Why this condition in update?
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
    } else if (!STATUS[newRole.status]) {
      throw new BadRequestException();
    }
    newRole = {
      ...newRole,
      tenant_id: currentUser.tenant_id,
      created_by: currentUser.id,
      updated_by: currentUser.id,
    };
    await this.isNameTaken(currentUser, newRole); // What to to if name is taken?
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
