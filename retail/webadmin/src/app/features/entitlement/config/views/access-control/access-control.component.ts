import { CONFIG } from '@config/index';
import { Component, OnInit, ViewChild } from "@angular/core";
import { Role } from "@feature/entitlement/models/role.model";
import { MatDialog } from "@angular/material/dialog";
import { ConfigMiddlewareService } from "../../services/config-middleware.service";

import { fuseAnimations } from "@fuse/animations";

import { BaseComponent } from '@shared/components/base/base.component';

@Component({
    selector: "app-access-control",
    templateUrl: "./access-control.component.html",
    animations: fuseAnimations,
})
export class AccessControlComponent extends BaseComponent implements OnInit {
    roles: Role[];
    
    pageSize:number=CONFIG.PAGE_SIZE;
    pageSizeOptions:Array<number>=CONFIG.PAGE_SIZE_OPTIONS;
    
    displayedColumns = [ "roleName","createdOn","expandIcon"];

    constructor(
        public _matDialog: MatDialog,
        private _service: ConfigMiddlewareService
    ) {
        super()
    }
    ngOnInit(): void {
        this.getData();
    }
    
    getData() {
        this._service.getRoles().subscribe(
            (response) => {
                this.roles = response;
                this.roles= this.roles.map((role) =>( {...role,role_name: role.name}));
            },
           (response=>super.onError(response))
        );
    }
}
