import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';

import { Module } from '@app/v1/modules/module.model';
import { ModuleRepository } from '@core/repository';
import { loaderSerializer } from '@common/utilities';

@Injectable()
export class ModulesLoader {
  constructor(private readonly modulesDB: ModuleRepository) {}

  async findModulesByRoleID(keys: readonly string[]): Promise<any> {
    const modules = await this.modulesDB.listModulesByRoleID(keys);
    return loaderSerializer(modules, keys, 'role_id');
  }
}

@Injectable()
export class ModulesDataLoader implements NestDataLoader<string, Module> {
  constructor(private readonly loader: ModulesLoader) {}

  generateDataLoader(): DataLoader<string, Module> {
    return new DataLoader<string, Module>(keys =>
      this.loader.findModulesByRoleID(keys),
    );
  }
}
