import { URI } from '@shared/constants/app.constants';
import { Injectable } from "@angular/core";
import { NetworkService } from "@shared/services/network/network.service";
import { WorkingDay } from '../models/working-week.model';
import { Holiday } from '../models/holiday.model';
import { Leave } from '../models/leave.model';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: "root",
})
export class CalendarService {
    constructor(private _networkService: NetworkService) { }

    getWorkingDays() {
        return this._networkService.getAll(URI.WORKING_DAYS, environment.API_BASE_URL_2);
    }

    createWorkingDay(model: WorkingDay) {
        return this._networkService.post(URI.WORKING_DAYS, environment.API_BASE_URL_2, model);
    }
    editWorkingDay(id: string, model: WorkingDay) {
        return this._networkService.onUpdate(`${URI.WORKING_DAYS}/${id}`, `${environment.API_BASE_URL_2}`, model);
    }
    deleteWorkingDay(id: string) {
        return this._networkService.onDelete(`${URI.WORKING_DAYS}/${id}`, `${environment.API_BASE_URL_2}`);
    }

    getHolidays() {
        return this._networkService.getAll(URI.HOLIDAYS, environment.API_BASE_URL_2, `${environment.API_BASE_URL_2}`);
    }
    createHoliday(model: Holiday) {
        return this._networkService.post(URI.HOLIDAYS, environment.API_BASE_URL_2, `${environment.API_BASE_URL_2}`, model);
    }
    editHoliday(id: string, model: Holiday) {
        return this._networkService.onUpdate(`${URI.HOLIDAYS}/${id}`, `${environment.API_BASE_URL_2}`, model);
    }
    deleteHoliday(id: string) {
        return this._networkService.onDelete(`${URI.HOLIDAYS}/${id}`, `${environment.API_BASE_URL_2}`);
    }


    getLeaves() {
        return this._networkService.getAll(URI.LEAVES, environment.API_BASE_URL_2);
    }
    createLeave(model: Leave) {
        return this._networkService.post(URI.LEAVES, environment.API_BASE_URL_2, model);
    }
    editLeave(id: string, model: Leave) {
        return this._networkService.onUpdate(`${URI.LEAVES}/${id}`, `${environment.API_BASE_URL_2}`, model);
    }
    deleteLeave(id: string) {
        return this._networkService.onDelete(`${URI.LEAVES}/${id}`, `${environment.API_BASE_URL_2}`);
    }
}
