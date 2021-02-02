import { URI } from '@shared/constants/app.constants';
import { Injectable } from '@angular/core';
import { RubixNetworkService } from '@shared/services/rubix-network/rubix-network.service.ts';
import { WorkingDay } from '../models/working-day.model';
import { Holiday } from '../models/holiday.model';
import { Leave } from '../models/leave.model';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CalendarService {
    constructor(private _RubixNetworkService: RubixNetworkService) {}

    getWorkingDays(): Observable<any> {
        return this._RubixNetworkService.getAll(URI.WORKING_DAYS);
    }
 
    createWorkingDay(model: WorkingDay): Observable<any> {
        return this._RubixNetworkService.post(URI.WORKING_DAYS, model);
    }
    editWorkingDay(id: string, model: WorkingDay): Observable<any> {
        return this._RubixNetworkService.onUpdate(`${URI.WORKING_DAYS}/${id}`, model);
    }
    deleteWorkingDay(id: string): Observable<any> {
        return this._RubixNetworkService.onDelete(`${URI.WORKING_DAYS}/${id}`);
    }

    getHolidays(queryParams): Observable<any> {
        return this._RubixNetworkService.getAll(`${URI.HOLIDAYS}?${queryParams}`);
    }
    createHoliday(model: Holiday): Observable<any> {
        return this._RubixNetworkService.post(URI.HOLIDAYS, model);
    }
    editHoliday(id: string, model: Holiday): Observable<any> {
        return this._RubixNetworkService.onUpdate(`${URI.HOLIDAYS}/${id}`, model);
    }
    deleteHoliday(id: string): Observable<any> {
        return this._RubixNetworkService.onDelete(`${URI.HOLIDAYS}/${id}`);
    }

    getLeaves(queryParams): Observable<any> {
        return this._RubixNetworkService.getAll(`${URI.LEAVES}?${queryParams}`);
    }
    createLeave(model: Leave): Observable<any> {
        return this._RubixNetworkService.post(URI.LEAVES, model);
    }
    editLeave(id: string, model: Leave): Observable<any> {
        return this._RubixNetworkService.onUpdate(`${URI.LEAVES}/${id}`, model);
    }
    deleteLeave(id: string): Observable<any> {
        return this._RubixNetworkService.onDelete(`${URI.LEAVES}/${id}`);
    }
    forkLeaveData(params): Observable<any> {
        return forkJoin([this.getLeaves(params), this.getLeaveType(), ]);
    }

    getLeaveType(): Observable<any> {
        return this._RubixNetworkService.getAll(URI.LEAVE_TYPE);
    }
    getUsers(queryParams?): Observable<any> {
        return this._RubixNetworkService.getAll(`${URI.USER}?${queryParams}`);
    }
}
