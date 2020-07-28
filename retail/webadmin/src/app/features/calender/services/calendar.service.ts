import { Injectable } from '@angular/core';
import { NetworkService } from '@core/services/network/network.service';
import { WORKING_WEEK } from '../calender.constant';

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
   
    getWorkingWeeks()
    {
       return this._httpClient.getAll(WORKING_WEEK);
    }
}
