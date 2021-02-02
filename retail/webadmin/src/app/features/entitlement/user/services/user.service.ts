import { URI } from '@shared/constants/app.constants';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { User } from '../../models/user.model';
import { RubixNetworkService } from '@shared/services/rubix-network/rubix-network.service';
import { ReferenceService } from '@shared/services/reference/reference.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    modules: Array<any> = [];
    constructor(private _RubixNetworkService: RubixNetworkService, private _refService: ReferenceService) {}
    createUser(user: User): Observable< any> {
        return this._RubixNetworkService.post(URI.USER_INVITATION, user);
    }
    resendInvite(id: string): Observable< any> {
        return this._RubixNetworkService.post(`${URI.USER_INVITATION}/${id}/resend`, {});
    }
    getUserById(id: string): Observable< any> {
        return this._RubixNetworkService.getById(`${URI.USER}/${id}`);
    }
    getUsers(queryParams): Observable<any> {
        return this._RubixNetworkService.getAll(`${URI.USER}?${queryParams}`);
    }
    getRoles(): Observable<any> {
        return this._RubixNetworkService.getAll(URI.ROLE);
    }
    editUser(id: string, model: User): Observable< any> {
        return this._RubixNetworkService.onUpdate(`${URI.USER}/${id}`, model);
    }
    deleteUser(id: string): Observable< any> {
        return this._RubixNetworkService.onDelete(`${URI.USER}/${id}`);
    }
    forkUserData(params): Observable< Array<any>> {
        return forkJoin([this.getUsers(params), this.getRoles(), this._refService.getCountries()]);
    }
}
