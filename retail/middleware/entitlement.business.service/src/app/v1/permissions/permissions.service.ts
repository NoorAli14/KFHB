import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Permission } from './permission.entity';
import { PermissionDto } from './permission.dto';
import { toGraphql } from '@common/utilities';
import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';

@Injectable()
export class PermissionService {
  constructor(private readonly gqlClient: GqlClientService) {}
  private _output: string = `{
    id
    record_type
    created_on
    created_by
  }`;
  async list(): Promise<Permission[]> {
    const params = `query {
      permissions: permissionsList ${this._output}
    }`;
    const result = await this.gqlClient.send(params);
    return result?.permissions;
  }

  async findBy(condition: any, output?: string): Promise<Permission[]> {
    const _output: string = output ? output : this._output;
    const params = `query {
      permission: findPermissionBy(checks: ${toGraphql(condition)}) ${_output}
    }`;
    const result = await this.gqlClient.send(params);
    return result?.permission;
  }

  async create(input: PermissionDto): Promise<Permission> {
    const [permission] = await this.findBy(
      [
        {
          record_key: 'record_type',
          record_value: input.record_type,
        },
      ],
      `{id}`,
    );
    if (permission) {
      throw new BadRequestException(`Permission Already Exist`);
    }
    const params = `mutation{
      permission: addPermission(input: ${toGraphql(input)}) ${this._output}
    }`;
    const result = await this.gqlClient.send(params);
    return result?.permission;
  }

  async findOne(id: string): Promise<Permission> {
    const params = `query {
      permission: findPermission(id: "${id}") ${this._output}
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
      permission: updatePermission(id: "${id}", input: ${toGraphql(input)}) ${
      this._output
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
