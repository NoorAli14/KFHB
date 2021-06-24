import { Injectable } from '@angular/core';
import { URI } from '@shared/constants/app.constants';
import { CorporateNetworkService } from '@shared/services/corporate-network/corporate-network.service';
import { forkJoin, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FinanceService {

    constructor(private _networkService: CorporateNetworkService) { }
    getApplications(queryParams): Observable<any> {
        return of({
            "status": 200,
            "message": "Request Success",
            "pagination": { "total": 646, "pages": 26, "pageSize": 25, "page": 1 }, 
            "data": [{
                "id": "3832fc58-0226-4c25-9254-0d9f65e499c8",
                "full_name": "MASHAEL ALI MOHAMEDALHASHEMI",
                "cpr": "878908295",
                "rim_no": "139294",
                "financing_amount": 0.0,
                "tenor": 0,
                "rate": 0.0,
                "created_on": "2021-06-21T10:44:07.477",
                "is_completed": false,
                "is_rejected": false,
                "is_approved": false,
                "status": "-",
                "application_type": "Real State",
                "updated_by": null,
                "is_overdue": false,
                "admin_update_date": null,
                "agreed_time": "2021-06-21T10:44:07.477",
                "is_executed": false,
                "final_approved": false
            }, {
                "id": "834f8353-5c7d-47b8-b8d1-e7dbef16e176",
                "full_name": "MASHAEL ALI MOHAMEDALHASHEMI",
                "cpr": "391024610",
                "rim_no": "139249",
                "financing_amount": 17400.0,
                "tenor": 7,
                "rate": 2.47,
                "created_on": "2021-03-16T10:38:14.63",
                "is_completed": true,
                "is_rejected": false,
                "is_approved": false,
                "status": "-",
                "application_type": "Auto Finance",
                "updated_by": null,
                "is_overdue": false,
                "admin_update_date": null,
                "agreed_time": "2021-03-16T10:38:14.63",
                "is_executed": false,
                "final_approved": false
            }]
        })
        //   return this._networkService.getAll(`${URI.FINANCE_APPLICATIONS}`);
    }
    getRoles(queryParams): Observable<any> {
        return this._networkService.getAll(`${URI.ROLE}?${queryParams}`);
    }
    createRole(model): Observable<any> {
        return this._networkService.post(URI.ROLE, model);
    }
    editRole(id: string, model): Observable<any> {
        return this._networkService.onUpdate(`${URI.ROLE}/${id}`, model);
    }
    deleteRole(id: string): Observable<any> {
        return this._networkService.onDelete(`${URI.ROLE}/${id}`);
    }
    forkRolesData(params): Observable<any> {
        return forkJoin([]);
    }

}
