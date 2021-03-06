import { URI } from '@shared/constants/app.constants';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { User } from '../../models/user.model';
import { ReferenceService } from '@shared/services/reference/reference.service';
import { RubixNetworkService } from '@shared/services/rubix-network/rubix-network.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    modules: Array<any> = [];
    constructor(private _networkService: RubixNetworkService, private _refService: ReferenceService) {}
    createUser(user: User): Observable< any> {
        return this._networkService.post(URI.USER_INVITATION, user);
    }
    resendInvite(id: string): Observable< any> {
        return this._networkService.post(`${URI.USER_INVITATION}/${id}/resend`, {});
    }
    getUserById(id: string): Observable< any> {
        return this._networkService.getById(`${URI.USER}/${id}`);
    }
    getUsers(queryParams): Observable<any> {
        return this._networkService.getAll(`${URI.USER}?${queryParams}`);
    }
    getRoles(): Observable<any> {
        return this._networkService.getAll(URI.ROLE);
    }
    editUser(id: string, model: User): Observable< any> {
        return this._networkService.onUpdate(`${URI.USER}/${id}`, model);
    }
    deleteUser(id: string): Observable< any> {
        return this._networkService.onDelete(`${URI.USER}/${id}`);
    }
    forkUserData(params): Observable< Array<any>> {
        return forkJoin([this.getUsers(params), this.getRoles(), this._refService.getCountries()]);
    }
}
