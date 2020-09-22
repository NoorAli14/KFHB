import {
  Injectable,
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
  constructor(private readonly gqlClient: GqlClientService) { }

  async list(): Promise<Module[]> {
    const query: string = `query {
      result: modulesList ${this.output}
    }`;
    return this.gqlClient.send(query);
  }

  async findBy(
    condition: any,
    output?: string,
  ): Promise<Module[]> {
    const _output: string = output || this.output;
    const query: string = `query {
      result: findModuleBy(checks: ${toGraphql(condition)}) ${_output}
    }`;
    return this.gqlClient.send(query);
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
    const mutation: string = `mutation {
      result: addModule(input: ${toGraphql(input)}) ${this.output}
    }`;
    return this.gqlClient.send(mutation);
  }

  async findOne(id: string, output?: string): Promise<Module> {
    const _output: string = output || this.output;
    const query: string = `query {
      result: findModuleById(id: "${id}") ${_output}
    }`;
    return this.gqlClient.send(query);
  }

  async update(id: string, input: ModuleDto): Promise<Module> {
    const query: string = `mutation {
      result: updateModule(id: "${id}", input: ${toGraphql(input)}) ${this.output
      }
    }`;
    return this.gqlClient.send(query);
  }

  async delete(id: string): Promise<any> {
    const mutation: string = `mutation {
      result: deleteModule(id: "${id}") 
    }`;
    return this.gqlClient.send(mutation);
  }
}
