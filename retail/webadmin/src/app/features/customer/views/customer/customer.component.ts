import { CustomerService } from './../../customer.service';
import { camelToSentenceCase, snakeToCamelArray } from '@shared/helpers/global.helper';
import { CustomerDetailComponent } from './../../components/customer-detail/customer-detail.component';
import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '@shared/components/base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { MODULES } from '@shared/constants/app.constants';
import { fuseAnimations } from '@fuse/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CONFIG } from '@config/index';
import { takeUntil } from 'rxjs/operators';
import { MESSAGES } from '@shared/constants/messages.constant';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class CustomerComponent extends BaseComponent implements OnInit {
  customers:any;
  pagination:any;
  dialogRef: any;
  pageSize: number = CONFIG.PAGE_SIZE;
  pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = [
      'firstName',
      'lastName',
      'email',
      'contactNo',
      'status',
      'gender',
      'action',
  ];

  constructor(
      public _matDialog: MatDialog,
      injector: Injector,
      private _service: CustomerService
  ) {
      super(injector, MODULES.ROLE_MANAGEMENT);
      super.ngOnInit();
  }
  ngOnInit(): void {
      this.getData();
  }

  getData(): void {
      this.customers=snakeToCamelArray([{
        "id": "A969F80D-24FF-4264-9221-0A7B78831001",
        "tenant_id": "9013C327-1190-4875-A92A-83ACA9029160",
        "session_id": null,
        "first_name": null,
        "last_name": null,
        "contact_no": "03338184261",
        "email": "faizuali4@gmail.com",
        "date_of_birth": null,
        "national_id_no": null,
        "national_id_expiry": null,
        "nationality": null,
        "nationality_code": null,
        "gender": null,
        "status": "PENDING",
        "created_on": "1603002290153",
        "created_by": "API",
        "updated_on": "1603002290153",
        "updated_by": "API"
    }])
    this.pagination={
        "total": 0,
        "pages": 0,
        "perPage": 0,
        "current": 0,
        "next": 0,
        "prev": 0,
        "isFirst": true,
        "isLast": true
    }
    this.dataSource = new MatTableDataSource(this.customers);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
  camelToSentenceCase(text): string {
    return camelToSentenceCase(text);
}
  openDialog(data): void {
      const _this = this;
      this.dialogRef = this._matDialog
          .open(CustomerDetailComponent, {
              data: data,
              disableClose: true,
              hasBackdrop: true,
              panelClass: 'app-role-form',
          })
  }
  getCustomerDetail(id){
    this._service.getCustomerById(id).pipe(takeUntil(this._unsubscribeAll)).subscribe(
          (response) => {
              debugger
              this.openDialog(response)
          },
          (response) => {
              this._notifier.error(MESSAGES.UNKNOWN);
          }
      );
  }
}
