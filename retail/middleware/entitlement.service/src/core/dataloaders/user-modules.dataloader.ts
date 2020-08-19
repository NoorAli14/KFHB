import {Injectable, Scope} from "@nestjs/common";
import {NestDataLoader} from "nestjs-dataloader/index";
import {Module} from "@app/v1/modules/module.model";
import {ModuleService} from "@app/v1/modules/module.service";
import * as DataLoader from "dataloader";

@Injectable({ scope: Scope.REQUEST })
export class ModulesDataLoaderByUser implements NestDataLoader<string, Module> {
  constructor(private readonly moduleService: ModuleService) { }

  generateDataLoader(): DataLoader<string, Module> {
    return new DataLoader<string, Module>(keys => this.moduleService.findModulesByUserID(keys));
  }
}
