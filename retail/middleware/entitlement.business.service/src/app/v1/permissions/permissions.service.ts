import { Injectable, NotFoundException } from '@nestjs/common';
import { Permission } from './permission.entity';
import { PermissionDto } from './permission.dto';
import { toGraphql } from '@common/utilities';
import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';

@Injectable()
export class PermissionService {
  constructor(private readonly gqlClient: GqlClientService) {}

  async list(): Promise<Permission[]> {
    const params = `query {
      permissions: permissionsList {
        id
        record_type
        created_on
        created_by
      }
    }`;
    const result = await this.gqlClient.send(params);
    return result?.permissions;
  }

  async create(input: PermissionDto): Promise<Permission> {
    const params = `mutation{
      permission: addPermission(input: ${toGraphql(
        input,
      )}) {id record_type created_on created_by}
    }`;
    const result = await this.gqlClient.send(params);
    return result?.permission;
  }

  async findOne(id: string): Promise<Permission> {
    const params = `query {
      permission: findPermission(id: "${id}") {
        id
        record_type
        created_on
        created_by
      }
    }`;
    const result = await this.gqlClient.send(params);
    return result?.permission;
  }

  async findById(id: string): Promise<Permission> {
    const params = `query {
      permission: findPermission(id: "${id}") {
        id
      }
    }`;
    const result = await this.gqlClient.send(params);
    return result?.permission;
  }

  async update(id: string, input: PermissionDto): Promise<Permission> {
    const permission: Permission = await this.findById(id);
    if (!permission) {
      throw new NotFoundException('Permission Not Found');
    }
    const params = `mutation {
      permission: updatePermission(id: "${id}", input: ${toGraphql(input)}) {
        id
        record_type
        created_by
        created_on
      } 
    }`;
    const result = await this.gqlClient.send(params);
    return result?.permission;
  }

  async delete(id: string): Promise<boolean> {
    const permission: Permission = await this.findById(id);
    if (!permission) {
      throw new NotFoundException('Permission Not Found');
    }
    const params = `mutation {
      permission: deletePermission(id: "${id}") 
    }`;
    const result = await this.gqlClient.send(params);
    return result?.permission;
  }
}
