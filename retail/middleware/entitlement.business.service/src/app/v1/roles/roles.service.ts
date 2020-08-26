import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from './role.entity';
import { RoleDto } from './role.dto';
import { toGraphql } from '@common/utilities';
import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';

@Injectable()
export class RoleService {
  constructor(private readonly gqlClient: GqlClientService) {}

  async list(): Promise<Role[]> {
    const params = `query {
      roles: rolesList {
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
          created_on
          created_by
        }
        status
        created_on
        created_by
        updated_on
        updated_by
      }
    }`;
    const result = await this.gqlClient.send(params);
    return result?.roles;
  }

  async create(input: RoleDto): Promise<Role> {
    const params = `mutation {
      role: addRole(input: ${toGraphql(input)}) {
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
      } 
    }`;
    const result = await this.gqlClient.send(params);
    return result?.role;
  }

  async findOne(id: string): Promise<Role> {
    const params = `query {
      role: findRole(id: "${id}") {
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
      }
    }`;
    const result = await this.gqlClient.send(params);
    return result?.role;
  }

  async findById(id: string): Promise<Role> {
    const params = `query {
      role: findRole(id: "${id}") {
        id
      }
    }`;
    const result = await this.gqlClient.send(params);
    return result?.role;
  }

  async update(id: string, input: RoleDto): Promise<Role> {
    const role: Role = await this.findById(id);
    if (!role) {
      throw new NotFoundException('Role Not Found');
    }
    const params = `mutation {
      role: updateRole(id: "${id}", input: ${toGraphql(input)}) {
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
      } 
    }`;
    const result = await this.gqlClient.send(params);
    return result?.role;
  }

  async delete(id: string): Promise<boolean> {
    const role: Role = await this.findById(id);
    if (!role) {
      throw new NotFoundException('Role Not Found');
    }
    const params = `mutation {
      role: deleteRole(id: "${id}") 
    }`;
    const result = await this.gqlClient.send(params);
    return result?.role;
  }
}
