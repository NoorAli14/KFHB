import { BaseComponent } from "@shared/components/base/base.component";
import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { Role } from "@feature/entitlement/models/role.model";

import {
    camelToSentenceCase,
    camelToSnakeCaseText,
} from "@shared/helpers/global.helper";
import { MESSAGES } from "@shared/constants/app.constants";
import {
    ConfirmDialogModel,
    ConfirmDialogComponent,
} from "@shared/components/confirm-dialog/confirm-dialog.component";
import { ConfigMiddlewareService } from "../../services/config-middleware.service";
import { FormControl } from "@angular/forms";
import { RoleFormComponent } from "../../components/role-form/role-form.component";

@Component({
    selector: "app-role",
    templateUrl: "./role.component.html",
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class RoleComponent extends BaseComponent implements OnInit {
    roles: Role[];
    modules: any[];
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
    ) {
        super();
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
                this.modules = response[1];
                this.roles = this.roles.map((role) => ({
                    ...role,
                    role_name: role.name,
                }));
            },
            (response) => super.onError(response)
        );
    }
    openDialog(data): void {
        var _this = this;
        this.dialogRef = this._matDialog
            .open(RoleFormComponent, {
                data: {
                    role: data ? data : new Role(),
                    userPermissions: this.userPermissions,
                    modules: this.modules,
                    roles: this.roles,
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

    mapModules(modules) {
        const mapped = modules.map((item) => {
            item.text = item.name;
            item.value = item.id;
            if (item.sub_modules && item.sub_modules.length > 0) {
                item.children = item.sub_modules;
                this.mapModules(item.sub_modules);
            }
            return item;
        });
        return mapped;
    }
    camelToSentenceCase(text) {
        return camelToSentenceCase(text);
    }
    camelToSnakeCase(text) {
        return camelToSnakeCaseText(text);
    }
    confirmDialog(id): void {
        const message = MESSAGES.REMOVE_CONFIRMATION;
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

    createRole(data: Role) {
        this._service.createRole(data).subscribe(
            (response) => {
                this._errorEmitService.emit(
                    MESSAGES.CREATED("Role"),
                    "success"
                );
            },
            (response=>{
                this._errorEmitService.emit(
                    MESSAGES.UNKNOWN,
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
        // this._service.editRole(model.id, model).subscribe(
        //     (response) => {
        //         this.errorType = "success";
        //         this.responseMessage = MESSAGES.UPDATED("Role");
        //         const index = this.dataSource.data.findIndex(
        //             (x) => x.id == model.id
        //         );
        //         this.roles[index] = response;
        //         this.updateGrid(this.roles);
        //         this.hideMessage();
        //         this._matDialog.closeAll();
        //     },
        //    (response=>super.onError(response))
        // );
    }
    onDelete(id: string) {
        this._service.deleteRole(id).subscribe(
            (response) => {
                this.errorType = "success";
                this.hideMessage();
                this.responseMessage = MESSAGES.DELETED("Role");
            },
            (response) => super.onError(response)
        );
    }
}
