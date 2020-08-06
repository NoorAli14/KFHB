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
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MESSAGES } from "@shared/constants/app.constants";
import {
    ConfirmDialogModel,
    ConfirmDialogComponent,
} from "@shared/components/confirm-dialog/confirm-dialog.component";

@Component({
    selector: "app-access-control",
    templateUrl: "./access-control.component.html",
    animations: fuseAnimations,
})
export class AccessControlComponent implements OnInit {
    dialogRef: any;
    roles: Role[];
    modules: Modules[];
    roleModulesList: RoleModuleModel[];
    message: string = "";
    type: string = "";
    pageSize:number=CONFIG.PAGE_SIZE;
    pageSizeOptions:Array<number>=CONFIG.PAGE_SIZE_OPTIONS;
    displayedColumns = ["moduleId", "roleId", "actions"];

    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    constructor(
        public _matDialog: MatDialog,
        private _service: ConfigMiddlewareService
    ) {}

    ngOnInit(): void {
        this.getData();
    }

    onCreateDialog(): void {
        this.dialogRef = this._matDialog.open(ManagePermissionFormComponent, {
            data: {
                roles: this.roles,
                modules: this.modules,
            },
            panelClass: "app-manage-permission-form",
        });
    }
    displayName(id, array) {
        return getName(id, "name", array);
    }

    getData() {
        this._service.forkConfigData().subscribe(
            (response) => {
                [this.modules, this.roles] = response;
                this.roleModulesList = snakeToCamelArray(
                    this.roleModulesList
                ) as RoleModuleModel[];

                this.dataSource = new MatTableDataSource(this.roleModulesList);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (error) => {
                console.log(error);
            }
        );
    }
    camelToSentenceCase(text) {
        return camelToSentenceCase(text);
    }
    confirmDialog(): void {
        const message = MESSAGES.REMOVE_CONFIRMATION;
        const dialogData = new ConfirmDialogModel("Confirm Action", message);
        const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
            data: dialogData,
            disableClose: true,
            panelClass: "app-confirm-dialog",
            hasBackdrop: true,
        });

        dialogRef.afterClosed().subscribe((dialogResult) => {});
    }
}
