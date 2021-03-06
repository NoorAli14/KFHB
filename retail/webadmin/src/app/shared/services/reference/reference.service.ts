import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URI } from '@shared/constants/app.constants';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RubixNetworkService } from '../rubix-network/rubix-network.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
    providedIn: 'root',
})
export class ReferenceService {
    constructor(
        private _service: RubixNetworkService,
        private storage: StorageService
    ) {}
    getCountries(): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('public', 'true');
        const countries = this.storage.getItem('countries');
        if (countries) {return  of(countries); }
        return this._service.getAll(URI.COUNTRIES, null, { headers }).pipe(
            map((data) => {
                if (data && data.length > 0) {
                    this.storage.setItem('countries', data);
                }
                return data;
            })
        );
    }
}
