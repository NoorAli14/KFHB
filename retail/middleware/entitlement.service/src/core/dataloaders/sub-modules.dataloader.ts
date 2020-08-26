import * as DataLoader from 'dataloader';
import {Injectable, Scope} from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';

import {Module} from "@app/v1/modules/module.model";
import {ModuleService} from "@app/v1/modules/module.service";


@Injectable({ scope: Scope.REQUEST })
export class SubModulesDataLoader implements NestDataLoader<string, Module> {
    constructor(private readonly moduleService: ModuleService) { }

    generateDataLoader(): DataLoader<string, Module> {
        return new DataLoader<string, Module>(keys => this.moduleService.findModulesByParentModuleID(keys));
    }
}

