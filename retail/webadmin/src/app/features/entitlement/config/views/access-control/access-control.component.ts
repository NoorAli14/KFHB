import { Permission } from './../../../models/config.model';
import { CONFIG } from './../../../../../config/index';
import { Component, OnInit, ViewChild } from "@angular/core";
import { Role } from "@feature/entitlement/models/role.model";
import { Modules } from "@feature/entitlement/models/modules.model";
import { RoleModuleModel } from "@feature/entitlement/models/config.model";
import { MatDialog } from "@angular/material/dialog";
import { ConfigMiddlewareService } from "../../services/config-middleware.service";
import { ManagePermissionFormComponent } from "../../components/manage-permission-form/manage-permission-form.component";
import {
    getName,
    snakeToCamelArray,
    camelToSentenceCase,
} from "@shared/helpers/global.helper";
import { fuseAnimations } from "@fuse/animations";

import { RoleModuleFormComponent } from '../../components/role-module-form/role-module-form.component';
import { BaseComponent } from '@shared/components/base/base.component';

@Component({
    selector: "app-access-control",
    templateUrl: "./access-control.component.html",
    animations: fuseAnimations,
})
export class AccessControlComponent extends BaseComponent implements OnInit {
    dialogRef: any;
    roles: Role[];
    modules: Modules[];
    permissions: Permission[];
    roleModulesList: RoleModuleModel[];
    
    

    pageSize:number=CONFIG.PAGE_SIZE;
    pageSizeOptions:Array<number>=CONFIG.PAGE_SIZE_OPTIONS;
    
    
    displayedColumns = ["expandIcon", "moduleId", "roleId","addIcon", "deleteIcon"];

    constructor(
        public _matDialog: MatDialog,
        private _service: ConfigMiddlewareService
    ) {
        super()
    }
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
           (response=>super.onError(response))
        );
    }
}
