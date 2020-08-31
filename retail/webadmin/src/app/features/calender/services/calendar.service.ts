import { Injectable } from '@angular/core';
import { NetworkService } from '@shared/services/network/network.service';
import { WORKING_WEEK, HOLIDAYS } from '../calender.constant';

@Injectable({
    providedIn:'root'
})
export class CalendarService
{
    constructor(
        private _httpClient: NetworkService
    )
    {
    }
   
    getWorkingDays()
    {
       return this._httpClient.getAll(WORKING_WEEK);
    }
   
    getHolidays()
    {
       return this._httpClient.getAll(HOLIDAYS);
    }
}
