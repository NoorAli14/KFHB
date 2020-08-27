import * as DataLoader from 'dataloader';
import {Injectable} from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';

import {Module} from "@app/v1/modules/module.model";
import {ModuleRepository} from '@core/repository';


@Injectable()
export class ModulesDataLoader implements NestDataLoader<string, Module> {
    constructor(private readonly moduleDB: ModuleRepository) { }

    generateDataLoader(): DataLoader<string, Module> {
        return new DataLoader<string, Module>(keys => this.moduleDB.listModulesByRoleID(keys));
    }
}
