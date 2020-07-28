import { CONFIG } from './../../../../../config/index';
import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { Role } from "@feature/entitlement/models/role.model";
import { RoleFormComponent } from "../../components/role-form/role-form.component";
import { ConfigMiddlewareService } from "../../services/config-middleware.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { getName, camelToSentenceCase } from '@shared/helpers/global.helper';
import { MESSAGES } from '@shared/constants/app.constants';
import { ConfirmDialogModel, ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: "app-role",
    templateUrl: "./role.component.html",
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class RoleComponent implements OnInit {
    dialogRef: any;
    roles: Role[];
    message: string = "";
    type: string = "";
    
    pageSize:number=CONFIG.PAGE_SIZE;
    pageSizeOptions:Array<number>=CONFIG.PAGE_SIZE_OPTIONS;
    
    
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

    displayedColumns = ["name", "status", "description", "actions"];
    
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
        this.dialogRef = this._matDialog.open(RoleFormComponent, {
            panelClass: "app-role-form",
            data: new Role(),
        });
    }
    onEditDialog(role): void {
        this.dialogRef = this._matDialog.open(RoleFormComponent, {
            panelClass: "app-role-form",
            data: role,
        });
    }
    getData() {
        this._service.getRoles().subscribe(
            (response) => {
                this.roles = response;
                this.dataSource = new MatTableDataSource(response);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (error) => {
                console.log(error);
            }
        );
    }
    camelToSentenceCase(text){
       return camelToSentenceCase(text)
    }
    confirmDialog(): void {
        const message = MESSAGES.REMOVE_CONFIRMATION;
        const dialogData = new ConfirmDialogModel("Confirm Action", message);
        const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
            data: dialogData,
            disableClose:true,
            panelClass: "app-confirm-dialog",
            hasBackdrop: true,
        });

        dialogRef.afterClosed().subscribe((dialogResult) => {

        });
    }
}
