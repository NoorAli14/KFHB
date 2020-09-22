import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Permission } from './permission.entity';
import { PermissionDto } from './permission.dto';
import { toGraphql, GqlClientService } from '@common/index';

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
      result: permissionsList ${this._output}
    }`;
    return this.gqlClient.send(params);
  }

  async findBy(condition: any, output?: string): Promise<Permission[]> {
    const _output: string = output ? output : this._output;
    const params = `query {
      result: findPermissionBy(checks: ${toGraphql(condition)}) ${_output}
    }`;
    return this.gqlClient.send(params);
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
      result: addPermission(input: ${toGraphql(input)}) ${this._output}
    }`;
    return this.gqlClient.send(params);
  }

  async findOne(id: string): Promise<Permission> {
    const params = `query {
      result: findPermission(id: "${id}") ${this._output}
    }`;
    return this.gqlClient.send(params);
  }

  async findById(id: string): Promise<Permission> {
    const params = `query {
      result: findPermission(id: "${id}") {
        id
      }
    }`;
    return this.gqlClient.send(params);
  }

  async update(id: string, input: PermissionDto): Promise<Permission> {
    const permission: Permission = await this.findById(id);
    if (!permission) {
      throw new NotFoundException('Permission Not Found');
    }
    const params = `mutation {
      result: updatePermission(id: "${id}", input: ${toGraphql(input)}) ${
      this._output
    }
    }`;
    return this.gqlClient.send(params);
  }

  async delete(id: string): Promise<boolean> {
    const permission: Permission = await this.findById(id);
    if (!permission) {
      throw new NotFoundException('Permission Not Found');
    }
    const params = `mutation {
      result: deletePermission(id: "${id}") 
    }`;
    return this.gqlClient.send(params);
  }
}
