import * as DataLoader from 'dataloader';
import {Injectable} from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';

import {Leave} from "@app/v1/leave/leave.model";
import {LeaveRepository} from '@core/repository';


@Injectable()
export class LeavesDataLoader implements NestDataLoader<string, Leave> {
    constructor(private readonly leaveDB: LeaveRepository) { }

    generateDataLoader(): DataLoader<string, Leave> {
        return new DataLoader<string, Leave>(keys => this.leaveDB.listLeavesByUserID(keys));
    }
}
