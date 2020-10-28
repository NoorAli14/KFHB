import { Injectable } from '@nestjs/common';
import {toGraphql, GqlClientService, PAGINATION_OUTPUT} from '@common/index';
import {Role, RolePaginationList} from './role.entity';
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

  async list(params?: any): Promise<RolePaginationList> {
    const query = `query {
      result: rolesList(
        filters: ${toGraphql(params?.filters)},
        sort_by: ${toGraphql(params?.sort_by)},
        pagination: ${toGraphql(params?.pagination)}
      ) {
        pagination ${PAGINATION_OUTPUT}
        data ${this.output}
      }
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
    const mutation: string = `mutation {
      result: updateRole(id: "${id}", input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.send(mutation);
  }

  async delete(id: string): Promise<boolean> {
    const mutation: string = `mutation {
      result: deleteRole(id: "${id}") 
    }`;
    return this.gqlClient.send(mutation);
  }
}
