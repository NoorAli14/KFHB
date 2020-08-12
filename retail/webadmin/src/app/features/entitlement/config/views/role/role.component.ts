import { BaseComponent } from "@shared/components/base/base.component";
import { CONFIG } from "./../../../../../config/index";
import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { Role } from "@feature/entitlement/models/role.model";
import { RoleFormComponent } from "../../components/role-form/role-form.component";
import { ConfigMiddlewareService } from "../../services/config-middleware.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {
    camelToSentenceCase,
    camelToSnakeCaseText,
} from "@shared/helpers/global.helper";
import { MESSAGES } from "@shared/constants/app.constants";
import {
    ConfirmDialogModel,
    ConfirmDialogComponent,
} from "@shared/components/confirm-dialog/confirm-dialog.component";
import { Modules } from '@feature/entitlement/models/modules.model';

@Component({
    selector: "app-role",
    templateUrl: "./role.component.html",
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class RoleComponent extends BaseComponent implements OnInit {
    dialogRef: any;
    roles: Role[];
    modules: Modules[];

    pageSize: number = CONFIG.PAGE_SIZE;
    pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;

    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

    displayedColumns = [
        "name",
        "status",
        "description",
        "createdOn",
        "actions",
    ];

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    constructor(
        public _matDialog: MatDialog,
        private _service: ConfigMiddlewareService
    ) {
        super("Config");
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.getData();
    }

    openDialog(data): void {
        var _this = this;
        this.dialogRef = this._matDialog
            .open(RoleFormComponent, {
                data: {
                    role: data ? data : new Role(),
                    userPermissions: this.userPermissions,
                    modules:this.modules
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

    getData() {
        this._service.forkRolesData().subscribe(
            (response) => {
                [this.roles,] = response;
                this.modules= this.mapModules(response[1])
                this.dataSource = new MatTableDataSource(this.roles);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.responseMessage = "";
            },
            (this.onError)
        );
    }
    mapModules(modules){
        const mapped=modules.map((item)=>{
            item.text=item.name;
            item.value=item.id
            if (item.sub_modules) {
                item.children=item.sub_modules;
                this.mapModules(item.sub_modules);
            }
            return item;
        })
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
                this.deleteRole(id);
            }
        });
    }

    createRole(data: Role) {
        this._service.createRole(data).subscribe(
            (response) => {
                this.errorType = "success";
                this.responseMessage = MESSAGES.CREATED("Role");
                const data = this.dataSource.data;

                data.push(response);
                this.updateGrid(data);
                this._matDialog.closeAll();
            },
            (this.onError)
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
                this.responseMessage = MESSAGES.UPDATED("Role");

                const index = this.dataSource.data.findIndex(
                    (x) => x.id == model.id
                );
                this.roles[index] = response;
                this.updateGrid(this.roles);
                this.hideMessage();
                this._matDialog.closeAll();
            },
            (this.onError)
        );
    }
    deleteRole(id: string) {
        this._service.deleteRole(id).subscribe(
            (response) => {
                const index = this.dataSource.data.findIndex((x) => x.id == id);
                this.roles.splice(index, 1);
                this.updateGrid(this.roles);
                this.errorType = "success";
                this.hideMessage();
                this.responseMessage = MESSAGES.DELETED("Role");
            },
            (this.onError)
        );
    }
    updateGrid(data) {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}
