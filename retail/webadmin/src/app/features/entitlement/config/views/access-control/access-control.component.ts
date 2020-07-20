import { Component, OnInit, ViewChild,  } from '@angular/core';
import { Role } from '@feature/entitlement/models/role.model';
import { Modules } from '@feature/entitlement/models/modules.model';
import { RoleModuleModel } from '@feature/entitlement/models/config.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfigMiddlewareService } from '../../services/config-middleware.service';
import { ManagePermissionFormComponent } from '../../components/manage-permission-form/manage-permission-form.component';
import { getName, snakeToCamel } from '@shared/helpers/global.helper';

@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.component.html',

})
export class AccessControlComponent implements OnInit {

  dialogRef: any;
  roles: Role[];
  modules: Modules[];
  roleModulesList: RoleModuleModel[];
  dataSource = new MatTableDataSource<RoleModuleModel>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  message: string = "";
  type: string = "";

  displayedColumns = ["moduleId", "roleId", "actions"];

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
              [this.modules, this.roles, this.roleModulesList] = response;
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
