import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Module } from './module.entity';
import { ModuleDto } from './module.dto';
import { GqlClientService, toGraphql, IHEADER } from '@common/index';

@Injectable()
export class ModuleService {
  private output: string = `{
    id
    name
    parent_id
    sub_modules {
      id
      name
      parent_id
      permissions {
        id
        module_permission_id
        record_type
        created_by
        created_on
      }
      status
      created_on
      created_by
    }
    permissions {
      id
      module_permission_id
      record_type
      created_by
      created_on
    }
    status
    created_on
    created_by
  }`;
  constructor(private readonly gqlClient: GqlClientService) {}

  async list(header: IHEADER): Promise<Module[]> {
    const query: string = `query {
      result: modulesList ${this.output}
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async findBy(
    header: IHEADER,
    condition: any,
    output?: string,
  ): Promise<Module[]> {
    const _output: string = output || this.output;
    const query: string = `query {
      result: findModuleBy(checks: ${toGraphql(condition)}) ${_output}
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async create(header: IHEADER, input: ModuleDto): Promise<Module> {
    const [module] = await this.findBy(
      header,
      [
        {
          record_key: 'name',
          record_value: input.name,
        },
      ],
      `{id}`,
    );
    if (module) {
      throw new BadRequestException(`Module '${input.name}' Already Exist`);
    }
    const mutation: string = `mutation {
      result: addModule(input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }

  async findOne(header: IHEADER, id: string, output?: string): Promise<Module> {
    const _output: string = output || this.output;
    const query: string = `query {
      result: findModuleById(id: "${id}") ${_output}
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async update(header: IHEADER, id: string, input: ModuleDto): Promise<Module> {
    const module: Module = await this.findOne(header, id, `{id}`);
    if (!module) {
      throw new NotFoundException('Module Not Found');
    }
    const query: string = `mutation {
      result: updateModule(id: "${id}", input: ${toGraphql(input)}) ${
      this.output
    }
    }`;
    return this.gqlClient.setHeaders(header).send(query);
  }

  async delete(header: IHEADER, id: string): Promise<any> {
    const module: Module = await this.findOne(header, id, `{id}`);
    if (!module) {
      throw new NotFoundException('Module Not Found');
    }
    const mutation: string = `mutation {
      result: deleteModule(id: "${id}") 
    }`;
    return this.gqlClient.setHeaders(header).send(mutation);
  }
}
