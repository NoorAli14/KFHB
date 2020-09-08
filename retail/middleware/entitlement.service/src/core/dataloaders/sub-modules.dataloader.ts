import * as DataLoader from 'dataloader';
import {Injectable} from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';

import {Module} from "@app/v1/modules/module.model";
import {ModuleRepository} from '@core/repository';
import {loaderSerializer} from '@common/utilities';

@Injectable()
export class SubModulesLoader {
    constructor(private readonly moduleDb: ModuleRepository) {}

    async findModulesByParentID(keys): Promise<any> {
        const modules = await this.moduleDb.listModulesByParentModuleID(keys);
        return loaderSerializer(modules, keys, 'parent_id')
    }
}

@Injectable()
export class SubModulesDataLoader implements NestDataLoader<string, Module> {
    constructor(private readonly loader: SubModulesLoader) { }

    generateDataLoader(): DataLoader<string, Module> {
        return new DataLoader<string, Module>(keys => this.loader.findModulesByParentID(keys));
    }
}

