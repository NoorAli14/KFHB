import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Module } from './module.entity';
import { ModuleDto } from './module.dto';
import { GqlClientService, toGraphql } from '@common/index';

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

  async list(): Promise<Module[]> {
    const params = `query {
      result: modulesList ${this.output}
    }`;
    return this.gqlClient.send(params);
  }

  async findBy(condition: any, output?: string): Promise<Module[]> {
    const _output: string = output ? output : this.output;
    const params = `query {
      result: findModuleBy(checks: ${toGraphql(condition)}) ${_output}
    }`;
    return this.gqlClient.send(params);
  }

  async create(input: ModuleDto): Promise<Module> {
    const [module] = await this.findBy(
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
    const params = `mutation{
      result: addModule(input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.send(params);
  }

  async findOne(id: string): Promise<Module> {
    const params = `query {
      result: findModule(id: "${id}") ${this.output}
    }`;
    return this.gqlClient.send(params);
  }

  async findById(id: string): Promise<Module> {
    const params = `query {
      result: findModule(id: "${id}") {
        id
      }
    }`;
    return this.gqlClient.send(params);
  }

  async update(id: string, input: ModuleDto): Promise<any> {
    const module: Module = await this.findById(id);
    if (!module) {
      throw new NotFoundException('Module Not Found');
    }
    const params = `mutation {
      result: updateModule(id: "${id}", input: ${toGraphql(input)}) ${
      this.output
    }
    }`;
    return this.gqlClient.send(params);
  }

  async delete(id: string): Promise<any> {
    const module: Module = await this.findById(id);
    if (!module) {
      throw new NotFoundException('Module Not Found');
    }
    const params = `mutation {
      result: deleteModule(id: "${id}") 
    }`;
    return this.gqlClient.send(params);
  }
}
