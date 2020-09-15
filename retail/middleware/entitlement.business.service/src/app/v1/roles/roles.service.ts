import { Injectable, NotFoundException } from '@nestjs/common';
import { toGraphql, GqlClientService, IHEADER } from '@common/index';

import { Role } from './role.entity';
import { RoleDto } from './role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly gqlClient: GqlClientService) {}

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
  
  async list(header: IHEADER): Promise<Role[]> {
    const query: string = `query {
      result: rolesList ${this.output}
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async create(header: IHEADER, input: RoleDto): Promise<Role> {
    const mutation: string = `mutation {
      result: addRole(input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }

  async findOne(header: IHEADER, id: string, output?: string): Promise<Role> {
    const query: string = `query {
      result: findRoleById(id: "${id}") ${output || this.output}
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async update(header: IHEADER, id: string, input: RoleDto): Promise<Role> {
    const role: Role = await this.findOne(header, id, '{id}');
    if (!role) {
      throw new NotFoundException('Role Not Found');
    }

    const mutation: string = `mutation {
      result: updateRole(id: "${id}", input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }

  async delete(header: IHEADER, id: string): Promise<boolean> {
    const role: Role = await this.findOne(header, id, '{id}');
    if (!role) {
      throw new NotFoundException('Role Not Found');
    }
    const mutation: string = `mutation {
      result: deleteRole(id: "${id}") 
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }
}
