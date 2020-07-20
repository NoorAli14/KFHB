import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Modules } from "@feature/entitlement/models/modules.model";
import { RoleModuleFormComponent } from "../../components/role-module-form/role-module-form.component";
import { ConfigMiddlewareService } from "../../services/config-middleware.service";
import {
    RoleModuleModel,
    Permission,
} from "@feature/entitlement/models/config.model";
import { Role } from "@feature/entitlement/models/role.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { snakeToCamel, getName } from "@shared/helpers/global.helper";
import { ManagePermissionFormComponent } from "../../components/manage-permission-form/manage-permission-form.component";

@Component({
    selector: "app-role-module-view",
    templateUrl: "./role-module.component.html",
    styleUrls: ["./role-module.component.scss"],
})
export class RoleModuleComponent implements OnInit {
    dialogRef: any;
    roles: Role[];
    modules: Modules[];
    permissions: Permission[];
    roleModulesList: RoleModuleModel[];
    message: string = "";
    type: string = "";

    displayedColumns = ["expandIcon", "moduleId", "roleId", "deleteIcon"];

    constructor(
        public _matDialog: MatDialog,
        private _service: ConfigMiddlewareService
    ) {}
    deleteUser(index: number): void {}
    ngOnInit(): void {
        this.getData();
    }

    onCreateDialog(): void {
        this.dialogRef = this._matDialog.open(RoleModuleFormComponent, {
            data: {
                roles: this.roles,
                modules: this.modules,
            },
            panelClass: "app-role-module-form",
        });
    }
    
    addPermission(id): void {
        this.dialogRef = this._matDialog.open(ManagePermissionFormComponent, {
            data: {
                permissions: this.permissions,
                roleModuleId: id,
            },
            panelClass: "app-manage-permission-form",
        });
    }
    getData() {
        this._service.forkConfigData().subscribe(
            (response) => {
                [
                    this.modules,
                    this.roles,
                    this.roleModulesList,
                    this.permissions,
                ] = response;
                this.roleModulesList = snakeToCamel(
                    this.roleModulesList
                ) as RoleModuleModel[];
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
