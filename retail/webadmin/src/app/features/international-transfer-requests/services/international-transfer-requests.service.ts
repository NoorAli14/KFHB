import { URI } from '@shared/constants/app.constants';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { RetailNetworkService } from '@shared/services/network/retail-network.service';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class InternationalTransferRequestsService {
    constructor(private _RetailNetworkService: RetailNetworkService) { }
}
