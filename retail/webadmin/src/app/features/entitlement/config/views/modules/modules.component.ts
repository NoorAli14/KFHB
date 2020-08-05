import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { fuseAnimations } from "@fuse/animations";
import { Permission } from "@feature/entitlement/models/config.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {
    camelToSentenceCase,
    camelToSnakeCaseText,
} from "@shared/helpers/global.helper";
import { MESSAGES } from "@shared/constants/app.constants";
import {
    ConfirmDialogModel,
    ConfirmDialogComponent,
} from "@shared/components/confirm-dialog/confirm-dialog.component";
import { CONFIG } from "@config/index";
import { Modules } from "@feature/entitlement/models/modules.model";
import { ConfigMiddlewareService } from "../../services/config-middleware.service";
import { ModulesFormComponent } from "../../components/modules-form/modules-form.component";

@Component({
    selector: "app-modules",
    templateUrl: "./modules.component.html",
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class ModulesComponent implements OnInit {
    dialogRef: any;
    modules: Modules[];
    permissions: Permission[];
    message: string = "";
    type: string = "";
    displayedColumns = ["name", "status", "parent", "createdOn", "actions"];
    pageSize: number = CONFIG.PAGE_SIZE;
    pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;

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

    openDialog(data): void {
        var _this = this;
        this.dialogRef = this._matDialog
            .open(ModulesFormComponent, {
                data: {
                    module: data ? data : new Modules(),
                    modules: this.modules,
                    permissions: this.permissions,
                },
                panelClass: "app-modules-form",
            })
            .componentInstance.sendResponse.subscribe((response) => {
                if (response.id) {
                    _this.editModule(response);
                } else {
                    _this.createModule(response);
                }
            });
    }

    getData() {
        this._service.forkModulesData().subscribe(
            (response) => {
                this.dataSource = new MatTableDataSource(response);
                [, this.permissions] = response;
                this.modules = [];
                this.makeFlat(response[0]);
                this.updateGrid(this.modules);
            },
            (error) => {
                this.type = "error";
                this.message = MESSAGES.UNKNOWN;
            }
        );
    }
    makeFlat(response: any[]) {
        response.forEach((item) => {
            item.parentModule = item.parent;
            item.parent = item.parent ? item.parent.name : "N/A";
            this.modules.push(item);
            if (item.children) {
                this.makeFlat(item.children);
            }
        });
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
                this.deleteModule(id);
            }
        });
    }

    createModule(data: Modules) {
        this._service.createModule(data).subscribe(
            (response) => {
                this.type = "success";
                this.message = MESSAGES.CREATED("Module");
                const data = this.dataSource.data;
                response.parentModule = response.parent;
                response.parent = response.parent
                    ? response.parent.name
                    : "N/A";
                data.push(response);
                this.updateGrid(data);
                this._matDialog.closeAll();
            },
            (response) => {
                this.type = "error";
                this.message = MESSAGES.UNKNOWN;
            }
        );
    }
    hideMessage() {
        setTimeout(() => {
            this.message = "";
        }, 2000);
    }
    editModule(model: Modules) {
        this._service.editModule(model.id, model).subscribe(
            (response) => {
                this.type = "success";
                this.message = MESSAGES.UPDATED("Module");
                response.parentModule = response.parent;
                response.parent = response.parent
                    ? response.parent.name
                    : "N/A";
                const index = this.dataSource.data.findIndex((x) => x.id == model.id);
                this.modules[index]=response;
                this.updateGrid(this.modules);
                this.hideMessage();
                this._matDialog.closeAll();
            },
            (response) => {
                this.type = "error";
                this.message = MESSAGES.UNKNOWN;
            }
        );
    }
    deleteModule(id: string) {
        this._service.deleteModule(id).subscribe(
            (response) => {
                const index = this.dataSource.data.findIndex((x) => x.id == id);
                this.modules.splice(index, 1);
                this.updateGrid(this.modules);
                this.type = "success";
                this.hideMessage();
                this.message = MESSAGES.DELETED("Module");
            },
            (response) => {
                this.type = "error";
                this.message = MESSAGES.UNKNOWN;
            }
        );
    }
    updateGrid(data) {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}
