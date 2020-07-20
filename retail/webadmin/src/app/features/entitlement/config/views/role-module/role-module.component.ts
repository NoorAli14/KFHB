import { PermissionComponent } from './../permission/permission.component';
import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Modules } from "@feature/entitlement/models/modules.model";
import { RoleModuleFormComponent } from "../../components/role-module-form/role-module-form.component";
import { ConfigMiddlewareService } from "../../services/config-middleware.service";
import { RoleModuleModel, Permission } from "@feature/entitlement/models/config.model";
import { Role } from "@feature/entitlement/models/role.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { snakeToCamel, getName } from "@shared/helpers/global.helper";
import { ManagePermissionFormComponent } from '../../components/manage-permission-form/manage-permission-form.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-role-module-view',
  templateUrl: './role-module.component.html',
  styleUrls    : ['./role-module.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RoleModuleComponent implements OnInit {
dialogRef: any;
    roles: Role[];
    modules: Modules[];
    permissions: Permission[];
    roleModulesList: RoleModuleModel[];
    dataSource = new MatTableDataSource<RoleModuleModel>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    message: string = "";
    type: string = "";

    displayedColumns = ["moduleId", "roleId","permission", "actions"];
    isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
    expandedElement: any;
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
        // merge(this.sort.sortChange, this.paginator.page)
        //     .pipe(tap(() => this.loadAllUsers()))
        //     .subscribe();
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
    addPermission(id): void {
        this.dialogRef = this._matDialog.open(ManagePermissionFormComponent, {
            data: {
                permissions:this.permissions,
                roleModuleId: id,
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
                [this.modules, this.roles, this.roleModulesList,this.permissions] = response;
                this.roleModulesList = snakeToCamel(
                    this.roleModulesList
                ) as RoleModuleModel[];
                this.dataSource.data = this.roleModulesList;
            },
            (error) => {
                console.log(error);
            }
        );
    }

}
