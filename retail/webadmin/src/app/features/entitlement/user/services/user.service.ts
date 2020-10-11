import { URI } from '@shared/constants/app.constants';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { User } from '../../models/user.model';
import { NetworkService } from '@shared/services/network/network.service';
import { ReferenceService } from '@shared/services/reference/reference.service';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    modules: Array<any> = [];
    constructor(private _networkService: NetworkService, private _refService: ReferenceService) { }
    createUser(user: User): Observable<any> {
        return this._networkService.post(environment.API_BASE_URL, URI.USER_INVITATION, user);
    }
    resendInvite(id: string): Observable<any> {
        return this._networkService.post(`${environment.API_BASE_URL}`, `${URI.USER_INVITATION}/${id}/resend`, {});
    }
    getUserById(id: string): Observable<any> {
        return this._networkService.getById(`${environment.API_BASE_URL}`, `${URI.USER}/${id}`);
    }
    getUsers(): Observable<any> {
        return this._networkService.getAll(environment.API_BASE_URL, URI.USER);
    }
    getRoles(): Observable<any> {
        return this._networkService.getAll(environment.API_BASE_URL, URI.ROLE);
    }
    editUser(id: string, model: User): Observable<any> {
        return this._networkService.onUpdate(`${environment.API_BASE_URL}`, `${URI.USER}/${id}`, model);
    }
    deleteUser(id: string): Observable<any> {
        return this._networkService.onDelete(`${environment.API_BASE_URL}`, `${URI.USER}/${id}`);
    }
    forkUserData(): Observable<Array<any>> {
        return forkJoin([this.getUsers(), this.getRoles(), this._refService.getCountries()]);
    }
}
