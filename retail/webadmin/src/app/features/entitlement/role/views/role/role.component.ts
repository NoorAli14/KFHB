import { BaseComponent } from "@shared/components/base/base.component";
import { Component, OnInit, ViewEncapsulation, ViewChild, Injector } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { Role } from "@feature/entitlement/models/role.model";

import {
    removeRandom,
} from "@shared/helpers/global.helper";
import { MESSAGES } from "@shared/constants/app.constants";
import {
    ConfirmDialogModel,
    ConfirmDialogComponent,
} from "@shared/components/confirm-dialog/confirm-dialog.component";
import { ConfigMiddlewareService } from "../../services/config-middleware.service";
import { FormControl } from "@angular/forms";
import { RoleFormComponent } from "../../components/role-form/role-form.component";
import { cloneDeep } from 'lodash';
import { Modules } from '@feature/entitlement/models/modules.model';

@Component({
    selector: "app-role",
    templateUrl: "./role.component.html",
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class RoleComponent extends BaseComponent implements OnInit {
    roles: Role[];
    modules: Modules[]=[]
    permissions: Permissions[]=[]
    dialogRef: any;

    roleName: FormControl;
    displayedColumns = [
        "roleName",
        "description",
        "createdOn",
        "expandIcon",
        "action",
    ];

    constructor(
        public _matDialog: MatDialog,

        private _service: ConfigMiddlewareService
        ,
        injector: Injector
        ) {
            super(injector,"Role Management");
    }
    ngOnInit(): void {
        this.roleName = new FormControl();
        this.getData();
        this.initSearch();
    }
    initSearch() {
        this.roleName.valueChanges.subscribe((text: string) => {});
    }
    getData() {
        this._service.forkRolesData().subscribe(
            (response) => {
                this.roles = response[0];
              const modules = response[1];
              this.permissions = response[2];
                this.makeFlat(modules,'')
                this.roles = this.roles.map((role) => ({
                    ...role,
                    role_name: role.name,
                }));
            },
            (response) => super.onError(response)
        );
    }
    makeFlat(modules: any[], parent) {
        modules.forEach((item) => {
            this.modules.push(item);
            if (item.sub_modules) {
                this.makeFlat(item.sub_modules, item.name);
            }
        });
    }
    openDialog(data,modules): void {
        
        var _this = this;
        this.dialogRef = this._matDialog
            .open(RoleFormComponent, {
                data: {
                    role: data ? data : new Role(),
                    userPermissions: this.userPermissions,
                    modules:modules? modules: cloneDeep(this.modules),
                    roles: this.roles,
                    permissions:this.permissions
                },
                panelClass: "app-role-form",
            })
            .componentInstance.sendResponse.subscribe((response) => {
                if (response.id) {
                    _this.editRole(response);
                } else {
                    _this.createRole(response);
                }
            });
    }
    confirmDialog(id): void {
        const message = removeRandom(MESSAGES.REMOVE_CONFIRMATION())
        const dialogData = new ConfirmDialogModel("Confirm Action", message);
        const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
            data: dialogData,
            disableClose: true,
            panelClass: "app-confirm-dialog",
            hasBackdrop: true,
        });

        dialogRef.afterClosed().subscribe((status) => {
            if (status) {
                this.onDelete(id);
            }
        });
    }
  
    onEditHandler(data){
        let modules=cloneDeep(this.modules)
       modules=modules.map(el=>{
            const exist=  this.findPermission(data.modules,el.id)
            if(!exist)return el;
            el.permissions=exist.permissions.map(x=>{
                return {
                    ...x,
                    value:true,
                   ... el.permissions.find(y=>y.id==x.id)
                }
            });
            return el;
        });
        this.openDialog(data,modules)
    }
    findPermission(modules, id) {
        let module, flag;
        modules.forEach((element) => {
            if (flag) return;
            if (element.id !== id) {
                if (!element.sub_modules) return;
                const returned = this.findPermission(element.sub_modules, id);
                module = returned;
            } else {
                flag = true;
                module = element;
            }
        });
        return module;
    }
    createRole(data: Role) {
        this._service.createRole(data).subscribe(
            (response) => {
               
                this.errorType = "success";
                this.responseMessage = MESSAGES.CREATED("Role");
                const clone= cloneDeep(this.roles)
                response.role_name=response.name;
                clone.unshift(response)
                this.roles=clone;
                this.hideMessage()
                this._matDialog.closeAll();
            },
            (response=>{
                this._errorEmitService.emit(
                    MESSAGES.UNKNOWN(),
                    "error"
                );
            })
        );
    }
    hideMessage() {
        setTimeout(() => {
            this.responseMessage = "";
        }, 2000);
    }
    editRole(model: Role) {
        this._service.editRole(model.id, model).subscribe(
            (response) => {
                this.errorType = "success";
                response.role_name=response.name;
                this.responseMessage = MESSAGES.UPDATED("Role");
                const clone= cloneDeep(this.roles)
                const index =clone.findIndex(
                    (x) => x.id == model.id
                );
                clone[index] = response;
                this.roles=clone;
                this.hideMessage();
                this._matDialog.closeAll();
            },
           (response=>super.onError(response))
        );
    }
    onDelete(id: string) {
        this._service.deleteRole(id).subscribe(
            (response) => {
                this.errorType = "success";
                this.hideMessage();
                const index = this.roles.findIndex((x) => x.id == id);
                const clone= cloneDeep(this.roles)
                clone.splice(index, 1);
                this.roles=clone;
                this.responseMessage = MESSAGES.DELETED("Role");
            },
            (response) => super.onError(response)
        );
    }
}
