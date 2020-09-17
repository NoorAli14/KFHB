import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URI } from "@shared/constants/app.constants";
import { map } from "rxjs/operators";
import { NetworkService } from "../network/network.service";

@Injectable({
    providedIn: "root",
})
export class ReferenceService {
    constructor(private _service: NetworkService) {}
    getCountries() {
        let headers = new HttpHeaders();
        headers = headers.set("public", "true");
        return this._service.getAll(URI.COUNTRIES, null, { headers }).pipe(
            map((data) => {
                const body = data.body;
                if (body.response) {
                }
                return body;
            })
        );
    }
}
