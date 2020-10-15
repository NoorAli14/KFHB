import { CustomerDetailComponent } from './../../components/customer-detail/customer-detail.component';
import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '@shared/components/base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { MODULES } from '@shared/constants/app.constants';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class CustomerComponent extends BaseComponent implements OnInit {
  permissions: Permissions[] = [];
  dialogRef: any;

  displayedColumns = [
      'roleName',
      'description',
      'createdOn',
      'expandIcon',
      'action',
  ];

  constructor(
      public _matDialog: MatDialog,
      injector: Injector
  ) {
      super(injector, MODULES.ROLE_MANAGEMENT);
      super.ngOnInit();
  }
  ngOnInit(): void {
      this.getData();
  }

  getData(): void {
      // this._roleService.forkRolesData().pipe(takeUntil(this._unsubscribeAll)).subscribe(
      //     (response) => {
      //         this.roles = response[0];
      //         const modules = response[1];
      //         this.permissions = response[2];
      //         this.modules = this._mapperService.makeModulesFlat(modules);
      //         this.roles = this.roles.map((role) => ({
      //             ...role,
      //             role_name: role.name,
      //         }));
      //     },
      //     (response) => {
      //         this._notifier.error(MESSAGES.UNKNOWN);
      //     }
      // );
  }

  openDialog(data, modules): void {
      const _this = this;
      this.dialogRef = this._matDialog
          .open(CustomerDetailComponent, {
              data: {
                 
              },
              disableClose: true,
              hasBackdrop: true,
              panelClass: 'app-role-form',
          })
  }
  
}
