import { CONFIG } from './../../../../../config/index';
import { Component, OnInit,  } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Modules } from "@feature/entitlement/models/modules.model";
import { RoleModuleFormComponent } from "../../components/role-module-form/role-module-form.component";
import { ConfigMiddlewareService } from "../../services/config-middleware.service";
import {
    RoleModuleModel,
    Permission,
} from "@feature/entitlement/models/config.model";
import { Role } from "@feature/entitlement/models/role.model";

import { snakeToCamelObject, snakeToCamelArray,  } from "@shared/helpers/global.helper";
import { ManagePermissionFormComponent } from "../../components/manage-permission-form/manage-permission-form.component";
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: "app-role-module-view",
    templateUrl: "./role-module.component.html",
    animations: fuseAnimations,
})
export class RoleModuleComponent implements OnInit {
    dialogRef: any;
    roles: Role[];
    modules: Modules[];
    permissions: Permission[];
    roleModulesList: RoleModuleModel[];
    message: string = "";
    type: string = "";

    pageSize:number=CONFIG.PAGE_SIZE;
    pageSizeOptions:Array<number>=CONFIG.PAGE_SIZE_OPTIONS;
    
    
    displayedColumns = ["expandIcon", "moduleId", "roleId","addIcon", "deleteIcon"];

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
    addNewModal(id): void {
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
                this.roleModulesList = snakeToCamelArray(
                    this.roleModulesList
                ) as RoleModuleModel[];
            },
            (error) => {
                console.log(error);
            }
        );
    }
   
}
