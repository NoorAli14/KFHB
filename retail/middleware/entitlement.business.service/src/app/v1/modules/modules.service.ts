import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Module } from './module.entity';
import { ModuleDto } from './module.dto';
import { toGraphql } from '@common/utilities';
import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';

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
      status
      created_on
      created_by
    }
    status
    created_on
    created_by
  }`;
  constructor(private readonly gqlClient: GqlClientService) {}

  async list(): Promise<Module[]> {
    const params = `query {
      modules: modulesList ${this.output}
    }`;
    const modules = await this.gqlClient.send(params);
    return modules?.modules;
  }

  async findBy(condition: any, output?: string): Promise<Module[]> {
    const _output: string = output ? output : this.output;
    const params = `query {
      module: findModuleBy(checks: ${toGraphql(condition)}) ${_output}
    }`;
    const result = await this.gqlClient.send(params);
    return result?.module;
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
      module: addModule(input: ${toGraphql(input)}) ${this.output}
    }`;
    const result = await this.gqlClient.send(params);
    return result?.module;
  }

  async findOne(id: string): Promise<Module> {
    const params = `query {
      module: findModule(id: "${id}") ${this.output}
    }`;
    const result = await this.gqlClient.send(params);
    return result?.module;
  }

  async findById(id: string): Promise<Module> {
    const params = `query {
      module: findModule(id: "${id}") {
        id
      }
    }`;
    const result = await this.gqlClient.send(params);
    return result?.module;
  }

  async update(id: string, input: ModuleDto): Promise<any> {
    const module: Module = await this.findById(id);
    if (!module) {
      throw new NotFoundException('Module Not Found');
    }
    const params = `mutation {
      module: updateModule(id: "${id}", input: ${toGraphql(input)}) ${
      this.output
    }
    }`;
    const result = await this.gqlClient.send(params);
    return result?.module;
  }

  async delete(id: string): Promise<any> {
    const module: Module = await this.findById(id);
    if (!module) {
      throw new NotFoundException('Module Not Found');
    }
    const params = `mutation {
      module: deleteModule(id: "${id}") 
    }`;
    const result = await this.gqlClient.send(params);
    return result?.module;
  }
}
