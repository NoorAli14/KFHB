import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Modules } from '../../../models/modules.model';
import { fuseAnimations } from '@fuse/animations';
import { Role } from '@feature/entitlement/models/role.model';
import { RoleModuleModel } from '@feature/entitlement/models/config.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfigMiddlewareService } from '../../services/config-middleware.service';
import { getName, snakeToCamel } from '@shared/helpers/global.helper';
import { ModulesFormComponent } from '../../components/modules-form/modules-form.component';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class ModulesComponent implements OnInit {

  dialogRef: any;
  modules: Modules[];
  dataSource = new MatTableDataSource<Modules>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  message: string = "";
  type: string = "";

  displayedColumns = ["name", "status","parent", "actions"];

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
      this.dialogRef = this._matDialog.open(ModulesFormComponent, {
        data: {
            module:new Modules(),
            modules:this.modules
        },
          panelClass: "app-modules-form",
      });
  }
  onEditDialog(module): void {
    this.dialogRef = this._matDialog.open(ModulesFormComponent, {
        data: {
            module,
            modules:this.modules
        },
        panelClass: "app-modules-form",
    });
}
  displayName(id) {
      return getName(id, "name", this.modules);
  }

  getData() {
      this._service.getModules().subscribe(
          (response) => {
              this.modules  = response;
              this.dataSource.data = this.modules;
          },
          (error) => {
              console.log(error);
          }
      );
  }
}
