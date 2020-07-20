import { Component, OnInit, Input } from "@angular/core";

import { ConfigMiddlewareService } from "../../services/config-middleware.service";
import { getName } from "@shared/helpers/global.helper";
import { Permission } from "@feature/entitlement/models/config.model";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: "app-permission",
    templateUrl: "./permission.component.html",
    styles:[`:host {
        width: 100%;
        padding:10px;
    }`]
})
export class PermissionComponent implements OnInit {
    permissions: Permission[];
    roleModulesList: any[];
    title = "";
    @Input() roleModuleId: string ; 
    displayedColumns = ["permissionId", "actions"];
    dataSource = new MatTableDataSource<Permission>();
    constructor(private _service: ConfigMiddlewareService) {}

    ngOnInit(): void {
        this.getData();
    }

    displayName(id, array) {
        return getName(id, "name", array);
    }

    getData() {
        this._service.forkPermissionData(this.roleModuleId).subscribe(
            (response) => {
                [this.roleModulesList,this.permissions]=response;
                this.dataSource.data = this.roleModulesList;
                console.log(response)
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
