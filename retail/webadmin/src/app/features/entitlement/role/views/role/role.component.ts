import { BaseComponent } from "@shared/components/base/base.component";
import {
    Component,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    Injector,
} from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { Role } from "@feature/entitlement/models/role.model";

import { removeRandom } from "@shared/helpers/global.helper";
import {  MODULES } from "@shared/constants/app.constants";
import {
    ConfirmDialogModel,
    ConfirmDialogComponent,
} from "@shared/components/confirm-dialog/confirm-dialog.component";
import { RoleService } from "../../services/role.service";
import { RoleFormComponent } from "../../components/role-form/role-form.component";
import { cloneDeep } from "lodash";
import { Modules } from "@feature/entitlement/models/modules.model";
import { takeUntil } from 'rxjs/operators';
import { MESSAGES } from '@shared/constants/messages.constant';

@Component({
    selector: "app-role",
    templateUrl: "./role.component.html",
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class RoleComponent extends BaseComponent implements OnInit {
    roles: Role[] = [];
    modules: Modules[] = [];
    permissions: Permissions[] = [];
    dialogRef: any;

    displayedColumns = [
        "roleName",
        "description",
        "createdOn",
        "status",
        "expandIcon",
        "action",
    ];

    constructor(
        public _matDialog: MatDialog,
        private _roleService: RoleService,
        injector: Injector
    ) {
        super(injector, MODULES.ROLE_MANAGEMENT);
    }
    ngOnInit(): void {
        this.getData();
    }

    getData() {
        this._roleService.forkRolesData().pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                this.roles = response[0];
                const modules = response[1];
                this.permissions = response[2];
                this.modules = this._mapperService.makeModulesFlat(modules);
                this.roles = this.roles.map((role) => ({
                    ...role,
                    role_name: role.name,
                }));
            },
            (response) => super.onError(response)
        );
    }

    openDialog(data, modules): void {
        var _this = this;
        this.dialogRef = this._matDialog
            .open(RoleFormComponent, {
                data: {
                    role: data ? data : new Role(),
                    userPermissions: this.userPermissions,
                    modules: modules ? modules : cloneDeep(this.modules),
                    roles: this.roles,
                    permissions: this.permissions,
                },
                disableClose: true,
                hasBackdrop: true,
                panelClass: "app-role-form",
            })
            .componentInstance.sendResponse.subscribe((response) => {
                if (!response) {
                    this._errorEmitService.emit("", "");
                } else if (response.id) {
                    _this.editRole(response);
                } else {
                    _this.createRole(response);
                }
            });
    }
    confirmDialog(id): void {
        const message = removeRandom(MESSAGES.REMOVE_CONFIRMATION());
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

    onEditHandler(data) {
        const flatModules= this._mapperService.makeModulesFlat(cloneDeep(data.modules))
        let modules = cloneDeep(this.modules);
        modules = modules.map((el) => {
            const exist =flatModules.find(x=>x.id==el.id);
            if (!exist) return el;
            el.permissions = el.permissions.map((x) => {
                const item=exist.permissions.find((y) => y.id == x.id);
                return {
                    ...x,
                    value: item?true : false,
                    ...item
                };
            });
            return el;
        });
        this.openDialog(data, modules);
    }

    createRole(data: Role) {
        this._roleService.createRole(data).pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                this.errorType = "success";
                this.responseMessage = MESSAGES.CREATED("Role");
                const clone = cloneDeep(this.roles);
                response.role_name = response.name;
                clone.unshift(response);
                this.roles = clone;
                this.hideMessage();
                this._matDialog.closeAll();
                this._errorEmitService.emit("", "");
            },
            (response) => {
                this._errorEmitService.emit(MESSAGES.UNKNOWN(), "error");
            }
        );
    }
    hideMessage() {
        setTimeout(() => {
            this.responseMessage = "";
        }, 2000);
    }
    editRole(model: Role) {
        this._roleService.editRole(model.id, model).pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                this.errorType = "success";
                response.role_name = response.name;
                this.responseMessage = MESSAGES.UPDATED("Role");
                const clone = cloneDeep(this.roles);
                const index = clone.findIndex((x) => x.id == model.id);
                clone[index] = response;
                this.roles = clone;
                this.hideMessage();
                this._matDialog.closeAll();
            },
            (response) => {
                this._errorEmitService.emit(MESSAGES.UNKNOWN(), "error");
            }
        );
    }
    onDelete(id: string) {
        this._roleService.deleteRole(id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                this.errorType = "success";
                this.hideMessage();
                const index = this.roles.findIndex((x) => x.id == id);
                const clone = cloneDeep(this.roles);
                clone.splice(index, 1);
                this.roles = clone;
                this.responseMessage = MESSAGES.DELETED("Role");
            },
            (response) => super.onError(response)
        );
    }
}
