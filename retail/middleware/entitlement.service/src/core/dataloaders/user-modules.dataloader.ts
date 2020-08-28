import {Injectable, Scope} from "@nestjs/common";
import {NestDataLoader} from "nestjs-dataloader";
import * as DataLoader from "dataloader";

import {Module} from "@app/v1/modules/module.model";
import {ModuleRepository} from '@core/repository';
import {loaderSerializer} from '@common/utilities';

@Injectable()
export class UserModulesDataLoader {
  constructor(private readonly moduleDb: ModuleRepository) {}

  async findModulesByUserID(keys): Promise<any> {
    const modules = await this.moduleDb.listModulesByUserID(keys);
    return loaderSerializer(modules, keys, 'user_id')
  }
}

@Injectable()
export class ModulesDataLoaderByUser implements NestDataLoader<string, Module> {
  constructor(private readonly loader: UserModulesDataLoader) { }

  generateDataLoader(): DataLoader<string, Module> {
    return new DataLoader<string, Module>(keys => this.loader.findModulesByUserID(keys));
  }
}
