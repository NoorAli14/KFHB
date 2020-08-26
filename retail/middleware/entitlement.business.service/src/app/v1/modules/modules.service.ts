import { Injectable, NotFoundException } from '@nestjs/common';
import { Module } from './module.entity';
import { ModuleDto } from './module.dto';
import { toGraphql } from '@common/utilities';
import { GqlClientService } from '@common/libs/gqlclient/gqlclient.service';

@Injectable()
export class ModuleService {
  constructor(private readonly gqlClient: GqlClientService) {}

  async list(): Promise<Module[]> {
    const params = `query {
      modules: modulesList {
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
    }`;
    const modules = await this.gqlClient.send(params);
    return modules?.modules;
  }

  async create(input: ModuleDto): Promise<Module> {
    const params = `mutation{
      module: addModule(input: ${toGraphql(input)}) {
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
    }`;
    const result = await this.gqlClient.send(params);
    return result?.module;
  }

  async findOne(id: string): Promise<Module> {
    const params = `query {
      module: findModule(id: "${id}") {
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
      module: updateModule(id: "${id}", input: ${toGraphql(input)}) {
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
