import * as DataLoader from 'dataloader';
import {Injectable} from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';

import {Leave} from "@app/v1/leave/leave.model";
import {LeaveRepository} from '@core/repository';
import {loaderSerializer} from '@common/utilities';

@Injectable()
export class LeavesLoader {
    constructor(private readonly leaveDB: LeaveRepository) {}

    async findLeavesByUserID(keys): Promise<any> {
        const leaves = await this.leaveDB.listLeavesByUserID(keys);
        return loaderSerializer(leaves, keys, 'user_id')
    }
}

@Injectable()
export class LeavesDataLoader implements NestDataLoader<string, Leave> {
    constructor(private readonly loader: LeavesLoader) { }

    generateDataLoader(): DataLoader<string, Leave> {
        return new DataLoader<string, Leave>(keys => this.loader.findLeavesByUserID(keys));
    }
}
