import { URI } from '@shared/constants/app.constants';
import { Injectable } from '@angular/core';
import { NetworkService } from '@shared/services/network/network.service';
import { WorkingDay } from '../models/working-day.model';
import { Holiday } from '../models/holiday.model';
import { Leave } from '../models/leave.model';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CalendarService {
    constructor(private _networkService: NetworkService) {}

    getWorkingDays(): Observable<any> {
        return this._networkService.getAll(URI.WORKING_DAYS);
    }
 
    createWorkingDay(model: WorkingDay): Observable<any> {
        return this._networkService.post(URI.WORKING_DAYS, model);
    }
    editWorkingDay(id: string, model: WorkingDay): Observable<any> {
        return this._networkService.onUpdate(`${URI.WORKING_DAYS}/${id}`, model);
    }
    deleteWorkingDay(id: string): Observable<any> {
        return this._networkService.onDelete(`${URI.WORKING_DAYS}/${id}`);
    }

    getHolidays(): Observable<any> {
        return this._networkService.getAll(URI.HOLIDAYS);
    }
    createHoliday(model: Holiday): Observable<any> {
        return this._networkService.post(URI.HOLIDAYS, model);
    }
    editHoliday(id: string, model: Holiday): Observable<any> {
        return this._networkService.onUpdate(`${URI.HOLIDAYS}/${id}`, model);
    }
    deleteHoliday(id: string): Observable<any> {
        return this._networkService.onDelete(`${URI.HOLIDAYS}/${id}`);
    }


    getLeaves(): Observable<any> {
        return this._networkService.getAll(URI.LEAVES);
    }
    createLeave(model: Leave): Observable<any> {
        return this._networkService.post(URI.LEAVES, model);
    }
    editLeave(id: string, model: Leave): Observable<any> {
        return this._networkService.onUpdate(`${URI.LEAVES}/${id}`, model);
    }
    deleteLeave(id: string): Observable<any> {
        return this._networkService.onDelete(`${URI.LEAVES}/${id}`);
    }
    forkLeaveData(): Observable<any> {
        return forkJoin([this._networkService.getAll(URI.LEAVES), this.getLeaveType(), this.getUsers()]);
    }

    getLeaveType(): Observable<any> {
        return this._networkService.getAll(URI.LEAVE_TYPE);
    }
    getUsers(): Observable<any> {
        return this._networkService.getAll(URI.USER);
    }
   
}
