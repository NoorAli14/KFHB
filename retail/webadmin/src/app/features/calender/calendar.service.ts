import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { NetworkService } from '@core/services/network/network.service';

@Injectable({
    providedIn:'root'
})
export class CalendarService implements Resolve<any>
{
    events: any;
    onEventsUpdated: Subject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: NetworkService
    )
    {
        // Set the defaults
        this.onEventsUpdated = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        
        return new Promise((resolve, reject) => {
            Promise.all([
                
                this.getEvents()
            ]).then(
                ([events]: [any]) => {
                    
                    resolve();
                },
                reject
            )
        });
    }

   
    getEvents(): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.getAll('/api/v1/calendar')
                .subscribe(
                    (response: any) => {
                    this.events = response.data;
                    this.onEventsUpdated.next(this.events);
                    resolve(this.events);
                }, (error)=>{
                }, reject);
        });
    }

    /**
     * Update events
     *
     * @param events
     * @returns {Promise<any>}
     */
    updateEvents(events): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('/api/calendar/events', {
                id  : 'events',
                data: [...events]
            })
                .subscribe((response: any) => {
                    this.getEvents();
                }, reject);
        });
    }

}
