import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Permission } from './permission.entity';
import { PermissionDto } from './permission.dto';
import { toGraphql, GqlClientService, IHEADER } from '@common/index';

@Injectable()
export class PermissionService {
  private readonly logger: Logger = new Logger(PermissionService.name);

  constructor(private readonly gqlClient: GqlClientService) {}

  private _output = `{
    id
    record_type
    created_on
    created_by
  }`;

  async list(header: IHEADER): Promise<Permission[]> {
    this.logger.log(`Start fetching list of all permissions`);
    const query: string = `query {
      result: permissionsList ${this._output}
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async findBy(
    header: IHEADER,
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
    return this.gqlClient.setHeaders(header).send(query);
  }

  async create(header: IHEADER, input: PermissionDto): Promise<Permission> {
    const [permission] = await this.findBy(
      header,
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
    return this.gqlClient.setHeaders(header).send(query);
  }

  async findOne(header: IHEADER, id: string): Promise<Permission> {
    this.logger.log(`Find One permission with ID [${id}]`);
    const query: string = `query {
      result: findPermissionById(id: "${id}") ${this._output}
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async findById(header: IHEADER, id: string): Promise<Permission> {
    this.logger.log(`Find permission with ID [${id}]`);
    const query: string = `query {
      result: findPermissionById(id: "${id}") {
        id
      }
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async update(
    header: IHEADER,
    id: string,
    input: PermissionDto,
  ): Promise<Permission> {
    this.logger.log(`Start Updating permission with ID [${id}]`);
    const permission: Permission = await this.findById(header, id);
    if (!permission) {
      throw new NotFoundException('Permission Not Found');
    }
    const query: string = `mutation {
      result: updatePermission(id: "${id}", input: ${toGraphql(input)}) ${
      this._output
    }
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async delete(header: IHEADER, id: string): Promise<boolean> {
    this.logger.log(`Start Deleting permission with ID [${id}]`);
    const permission: Permission = await this.findById(header, id);
    if (!permission) {
      throw new NotFoundException('Permission Not Found');
    }
    const query: string = `mutation {
      result: deletePermission(id: "${id}") 
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }
}
