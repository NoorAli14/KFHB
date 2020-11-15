import { camelToSnakeCaseText } from "./../../../../shared/helpers/global.helper";
import { CustomerService } from "./../../customer.service";
import {
    camelToSentenceCase,
    snakeToCamelArray,
} from "@shared/helpers/global.helper";
import { CustomerDetailComponent } from "./../../components/customer-detail/customer-detail.component";
import {
    AfterViewInit,
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
import { Pagination } from "@shared/models/pagination.model";
import * as QueryString from "query-string";
import { ReferenceService } from "@shared/services/reference/reference.service";
@Component({
    selector: "app-customer",
    templateUrl: "./customer.component.html",
    styleUrls: ["./customer.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class CustomerComponent
    extends BaseComponent
    implements OnInit, AfterViewInit {
    customers: any;
    pagination: Pagination;
    nationalityList = [];
    dialogRef: any;
    config: object;
    pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
    dataSource = new MatTableDataSource<any>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    displayedColumns = [
        "firstName",
        "lastName",
        "email",
        "contactNo",
        "nationalIdNo",
        "status",
        "createdOn",
        "action",
    ];

    constructor(
        public _matDialog: MatDialog,
        injector: Injector,
        private _refService: ReferenceService,
        private _service: CustomerService
    ) {
        super(injector, MODULES.ROLE_MANAGEMENT);
        super.ngOnInit();
        this.pagination = new Pagination();
    }
    ngOnInit(): void {
        this.config = this.initParams();

        this.getData({});
        this.getCountries();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    getQueryString(params): string {
        return QueryString.stringify(params);
    }

    createQueryObject(params): any {
        return {
            ...this.config,
            ...params,
        };
    }

    getCountries(): void {
        this._refService.getCountries().subscribe((response) => {
            this.nationalityList = response;
        });
    }

    getData(params): void {
        const queryParams = QueryString.stringify(
            this.createQueryObject(params)
        );
        this._service
            .getCustomers(queryParams)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    this.customers = snakeToCamelArray(response.data);
                    this.pagination = response.pagination;
                    this.dataSource = new MatTableDataSource(this.customers);
                    this.pagination.page = this.pagination.page - 1;
                },
                (response) => super.onError(response)
            );
    }
    onPageFired(data): void {
        this.getData({ page: data["pageIndex"] + 1, limit: data["pageSize"] });
    }

    onFilter(form): void {
        this.config = { ...this.config, ...form };
        this.getData(form);
    }
    initParams(): object {
        return {
            limit: CONFIG.PAGE_SIZE,
            page: 1,
            sort_order: 'asc',
            sort_by: 'first_name'
        };
    }
    onReset(): void {
        this.config = this.initParams();
        this.getData({});
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
    getCustomerDetail(id): void {
        //  id = "34A8F400-23F0-445F-A20C-5407BDC1C6FC";
        this._service
            .forkCustomer360(id)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    this.openDialog(response);
                },
                (response) => super.onError(response)
            );
    }
    sortData(e): void {
        this.getData({
            sort_order: e.direction ? e.direction : "asc",
            sort_by: camelToSnakeCaseText(e.active),
        });
    }
}
