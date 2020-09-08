import { Injectable, NotFoundException } from '@nestjs/common';
import { toGraphql, GqlClientService } from '@common/index';

import { Role } from './role.entity';
import { RoleDto } from './role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly gqlClient: GqlClientService) {}

  private output: string = `{
    id
    name
    modules {
      id
      name
      parent_id
      sub_modules {
        id
        name
        parent_id
        permissions {
          id
          record_type
          created_on
          created_by
        }
        status
        created_on
        created_by
      }
      permissions {
        id
        record_type
        created_on
        created_by
      }
      status
      created_on
      created_by
    }
    status
    created_on
    created_by
    updated_on
    updated_by
  }`;
  async list(): Promise<Role[]> {
    const params = `query {
      result: rolesList ${this.output}
    }`;
    return this.gqlClient.send(params);
  }

  async create(input: RoleDto): Promise<Role> {
    const params = `mutation {
      result: addRole(input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.send(params);
  }

  async findOne(id: string, output?: string): Promise<Role> {
    const params = `query {
      result: findRoleById(id: "${id}") ${output || this.output}
    }`;
    return this.gqlClient.send(params);
  }

  async update(id: string, input: RoleDto): Promise<Role> {
    const role: Role = await this.findOne(id, '{id}');
    if (!role) {
      throw new NotFoundException('Role Not Found');
    }
    const params = `mutation {
      result: updateRole(id: "${id}", input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.send(params);
  }

  async delete(id: string): Promise<boolean> {
    const role: Role = await this.findOne(id, '{id}');
    if (!role) {
      throw new NotFoundException('Role Not Found');
    }
    const params = `mutation {
      result: deleteRole(id: "${id}") 
    }`;
    return this.gqlClient.send(params);
  }
}
