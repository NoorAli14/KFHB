import {
  Injectable,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Permission } from './permission.entity';
import { PermissionDto } from './permission.dto';
import { toGraphql, GqlClientService } from '@common/index';

@Injectable()
export class PermissionService {
  private readonly logger: Logger = new Logger(PermissionService.name);

  constructor(private readonly gqlClient: GqlClientService) { }

  private _output = `{
    id
    record_type
    created_on
    created_by
  }`;

  async list(): Promise<Permission[]> {
    this.logger.log(`Start fetching list of all permissions`);
    const query: string = `query {
      result: permissionsList ${this._output}
    }`;
    return this.gqlClient.send(query);
  }

  async findBy(
    condition: any,
    output?: string,
  ): Promise<Permission[]> {
    this.logger.log(
      `Find Permission with key: [${condition[0].record_key}] and value: [${condition[0].record_value}]`,
    );

    const _output: string = output ? output : this._output;
    const query: string = `query {
      result: findPermissionBy(checks: ${toGraphql(condition)}) ${_output}
    }`;
    return this.gqlClient.send(query);
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
    const query: string = `mutation{
      result: addPermission(input: ${toGraphql(input)}) ${this._output}
    }`;
    return this.gqlClient.send(query);
  }

  async findOne(id: string): Promise<Permission> {
    this.logger.log(`Find One permission with ID [${id}]`);
    const query: string = `query {
      result: findPermissionById(id: "${id}") ${this._output}
    }`;
    return this.gqlClient.send(query);
  }

  async findById(id: string): Promise<Permission> {
    this.logger.log(`Find permission with ID [${id}]`);
    const query: string = `query {
      result: findPermissionById(id: "${id}") {
        id
      }
    }`;
    return this.gqlClient.send(query);
  }

  async update(
    id: string,
    input: PermissionDto,
  ): Promise<Permission> {
    this.logger.log(`Start Updating permission with ID [${id}]`);
    const query: string = `mutation {
      result: updatePermission(id: "${id}", input: ${toGraphql(input)}) ${this._output
      }
    }`;
    return this.gqlClient.send(query);
  }

  async delete(id: string): Promise<boolean> {
    this.logger.log(`Start Deleting permission with ID [${id}]`);
    const query: string = `mutation {
      result: deletePermission(id: "${id}") 
    }`;
    return this.gqlClient.send(query);
  }
}
