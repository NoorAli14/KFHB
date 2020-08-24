import * as DataLoader from 'dataloader';
import {Injectable, Scope} from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';

import {Leave} from "@app/v1/leave/leave.model";
import {LeavesService} from "@app/v1/leave/leaves.service";


@Injectable({ scope: Scope.REQUEST })
export class LeavesDataLoader implements NestDataLoader<string, Leave> {
    constructor(private readonly leavesService: LeavesService) { }

    generateDataLoader(): DataLoader<string, Leave> {
        return new DataLoader<string, Leave>(keys => this.leavesService.findLeavesByUserID(keys));
    }
}
