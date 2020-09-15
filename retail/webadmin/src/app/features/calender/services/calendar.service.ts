import { URI } from '@shared/constants/app.constants';
import { Injectable } from "@angular/core";
import { NetworkService } from "@shared/services/network/network.service";
import { WORKING_DAYS, HOLIDAYS } from "../calender.constant";
import { WorkingDay } from '../models/working-week.model';

@Injectable({
    providedIn: "root",
})
export class CalendarService {
    constructor(private _networkService: NetworkService) {}

    getWorkingDays() {
        return this._networkService.getAll(URI.WORKING_DAYS);
    }

    getHolidays() {
        return this._networkService.getAll(HOLIDAYS);
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
}
