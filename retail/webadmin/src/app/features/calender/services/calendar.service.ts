import { URI } from '@shared/constants/app.constants';
import { Injectable } from "@angular/core";
import { NetworkService } from "@shared/services/network/network.service";
import { WorkingDay } from '../models/working-week.model';
import { Holiday } from '../models/holiday.model';
import { Leave } from '../models/leave.model';

@Injectable({
    providedIn: "root",
})
export class CalendarService {
    constructor(private _networkService: NetworkService) {}

    getWorkingDays() {
        return this._networkService.getAll(URI.WORKING_DAYS);
    }
 
    createWorkingDay(model: WorkingDay) {
        return this._networkService.post(URI.WORKING_DAYS, model);
    }
    editWorkingDay(id: string, model: WorkingDay) {
        return this._networkService.onUpdate(`${URI.WORKING_DAYS}/${id}`, model);
    }
    deleteWorkingDay(id: string) {
        return this._networkService.onDelete(`${URI.WORKING_DAYS}/${id}`);
    }

    getHolidays() {
        return this._networkService.getAll(URI.HOLIDAYS);
    }
    createHoliday(model: Holiday) {
        return this._networkService.post(URI.HOLIDAYS, model);
    }
    editHoliday(id: string, model: Holiday) {
        return this._networkService.onUpdate(`${URI.HOLIDAYS}/${id}`, model);
    }
    deleteHoliday(id: string) {
        return this._networkService.onDelete(`${URI.HOLIDAYS}/${id}`);
    }


    getLeaves() {
        return this._networkService.getAll(URI.LEAVES);
    }
    createLeave(model: Leave) {
        return this._networkService.post(URI.LEAVES, model);
    }
    editLeave(id: string, model: Leave) {
        return this._networkService.onUpdate(`${URI.LEAVES}/${id}`, model);
    }
    deleteLeave(id: string) {
        return this._networkService.onDelete(`${URI.LEAVES}/${id}`);
    }
}
