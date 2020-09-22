import { Injectable } from '@nestjs/common';
import { toGraphql, GqlClientService } from '@common/index';

import { Role } from './role.entity';
import { RoleDto } from './role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly gqlClient: GqlClientService) { }

  private output: string = `{
    id
    name
    description
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
    const query: string = `query {
      result: rolesList ${this.output}
    }`;
    return this.gqlClient.send(query);
  }

  async create(input: RoleDto): Promise<Role> {
    const mutation: string = `mutation {
      result: addRole(input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.send(mutation);
  }

  async findOne(id: string, output?: string): Promise<Role> {
    const query: string = `query {
      result: findRoleById(id: "${id}") ${output || this.output}
    }`;
    return this.gqlClient.send(query);
  }

  async update(id: string, input: RoleDto): Promise<Role> {
    // const role: Role = await this.findOne(header, id, '{id}');
    // if (!role) {
    //   throw new NotFoundException('Role Not Found');
    // }

    const mutation: string = `mutation {
      result: updateRole(id: "${id}", input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.send(mutation);
  }

  async delete(id: string): Promise<boolean> {
    // const role: Role = await this.findOne(header, id, '{id}');
    // if (!role) {
    //   throw new NotFoundException('Role Not Found');
    // }
    const mutation: string = `mutation {
      result: deleteRole(id: "${id}") 
    }`;
    return this.gqlClient.send(mutation);
  }
}
