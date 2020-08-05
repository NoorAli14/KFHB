import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import {  Permission } from '@feature/entitlement/models/config.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { camelToSentenceCase } from '@shared/helpers/global.helper';
import { MESSAGES } from '@shared/constants/app.constants';
import { ConfirmDialogModel, ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { CONFIG } from '@config/index';
import { Modules } from '@feature/entitlement/models/modules.model';
import { ConfigMiddlewareService } from '../../services/config-middleware.service';
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
  permissions: Permission[];
  message: string = "";
  type: string = "";
  displayedColumns = ["name", "status","parent", "actions"];
  pageSize:number=CONFIG.PAGE_SIZE;
  pageSizeOptions:Array<number>=CONFIG.PAGE_SIZE_OPTIONS;
  
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
      this.dialogRef = this._matDialog.open(ModulesFormComponent, {
        data: {
            module:new Modules(),
            permissions:this.permissions
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
 
  getData() {
      this._service.forkModulesData().subscribe(
          (response) => {
              this.dataSource = new MatTableDataSource(response);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;

              [this.modules,this.permissions]  = response;
              this.dataSource.data = this.modules;
          },
          (error) => {
            debugger
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
