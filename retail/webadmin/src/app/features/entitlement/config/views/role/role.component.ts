import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { Role } from "@feature/entitlement/models/role.model";
import { RoleFormComponent } from "../../components/role-form/role-form.component";
import { Modules } from "@feature/entitlement/models/modules.model";
import { RoleModuleModel } from "@feature/entitlement/models/config.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ConfigMiddlewareService } from "../../services/config-middleware.service";
import { getName, snakeToCamel } from "@shared/helpers/global.helper";

@Component({
    selector: "app-role",
    templateUrl: "./role.component.html",
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class RoleComponent implements OnInit {
    dialogRef: any;
    roles: Role[];
    dataSource = new MatTableDataSource<Role>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    message: string = "";
    type: string = "";

    displayedColumns = ["name", "status", "description", "actions"];

    constructor(
        public _matDialog: MatDialog,
        private _service: ConfigMiddlewareService
    ) {}

    ngOnInit(): void {
        this.getData();
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    onCreateDialog(): void {
        this.dialogRef = this._matDialog.open(RoleFormComponent, {
            panelClass: "app-role-form",
            data:new Role()
        });
    }
    onEditDialog(role): void {
        this.dialogRef = this._matDialog.open(RoleFormComponent, {
            panelClass: "app-role-form",
            data:role
        });
    }
    getData() {
        this._service.getRoles().subscribe(
            (response) => {
                 this.roles = response;
                this.dataSource.data = this.roles;
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
