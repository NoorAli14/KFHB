import { CustomerService } from "./../../customer.service";
import {
    camelToSentenceCase,
    snakeToCamelArray,
} from "@shared/helpers/global.helper";
import { CustomerDetailComponent } from "./../../components/customer-detail/customer-detail.component";
import {
    Component,
    Injector,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { BaseComponent } from "@shared/components/base/base.component";
import { MatDialog } from "@angular/material/dialog";
import { MODULES } from "@shared/constants/app.constants";
import { fuseAnimations } from "@fuse/animations";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { CONFIG } from "@config/index";
import { takeUntil } from "rxjs/operators";
import { MESSAGES } from "@shared/constants/messages.constant";
import { Pagination } from '@shared/models/pagination.model';

@Component({
    selector: "app-customer",
    templateUrl: "./customer.component.html",
    styleUrls: ["./customer.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class CustomerComponent extends BaseComponent implements OnInit {
    customers: any;
    pagination: Pagination;
    dialogRef: any;
    pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    displayedColumns = [
        "firstName",
        "lastName",
        "email",
        "contactNo",
        "status",
        "gender",
        "action",
    ];

    constructor(
        public _matDialog: MatDialog,
        injector: Injector,
        private _service: CustomerService
    ) {
        super(injector, MODULES.ROLE_MANAGEMENT);
        super.ngOnInit();
        this.pagination=new Pagination();
    }
    ngOnInit(): void {
        this.getData(1,CONFIG.PAGE_SIZE);
    }

    getData(pageIndex,perPage): void {
        this._service
            .getCustomers(pageIndex,perPage)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    this.customers = snakeToCamelArray(response.data);
                    this.pagination = response.pagination;
                    this.dataSource = new MatTableDataSource(this.customers);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                },
                (response) => {
                    this._notifier.error(MESSAGES.UNKNOWN);
                }
            );
    }
    onPageFired(data){
        // this.getDetail(this.currentTab,data['pageIndex']+1)
      }
    camelToSentenceCase(text): string {
        return camelToSentenceCase(text);
    }
    openDialog(data): void {
        const _this = this;
        this.dialogRef = this._matDialog.open(CustomerDetailComponent, {
            data: data,
            disableClose: true,
            hasBackdrop: true,
            panelClass: "app-customer-detail",
        });
    }
    hello() {}
    getCustomerDetail(id) {
         id="34A8F400-23F0-445F-A20C-5407BDC1C6FC";
        this._service
            .getCustomerById(id)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    this.openDialog(response);
                },
                (response) => {
                    this._notifier.error(MESSAGES.UNKNOWN);
                }
            );
    }
}
