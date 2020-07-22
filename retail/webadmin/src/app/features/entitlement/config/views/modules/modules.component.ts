import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';

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
 
  getData() {
      this._service.getModules().subscribe(
          (response) => {
              this.modules  = response;
          },
          (error) => {
              console.log(error);
          }
      );
  }
}
