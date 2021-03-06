import { camelToSnakeCaseText, snakeToCamelObject, toggleSort } from "@shared/helpers/global.helper";
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
import { Pagination } from "@shared/models/pagination.model";
import * as QueryString from "query-string";
import { ReferenceService } from "@shared/services/reference/reference.service";
import { CobCustomerDetailComponent } from "@feature/customer/components/cob-customer-detail/cob-customer-detail.component";
import { MatSortDirection } from "@shared/enums/app.enum";
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
    previousFilterState: MatSortDirection;

    displayedColumns = [
        "firstName",
        "lastName",
        "email",
        "contactNo",
        "nationalIdNo",
        "nationality",
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
        super(injector, MODULES.CUSTOMERS);
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
        return QueryString.stringify(params, { encode: false });
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
        this.config = this.initParams();
        this.config = { ...form, ...this.config, };
        this.getData(this.config);
    }
    initParams(): object {
        return {
            limit: CONFIG.PAGE_SIZE,
            page: 1,
            sort_order: MatSortDirection.desc,
            sort_by: 'created_on'
        };
    }
    onReset(): void {
        this.config = this.initParams();
        this.getData({});
    }
    camelToSentenceCase(text): string {
        return camelToSentenceCase(text);
    }
    openRetailDialog(data): void {
        const _this = this;
        this.dialogRef = this._matDialog.open(CustomerDetailComponent, {
            data: data,
            disableClose: true,
            hasBackdrop: true,
            panelClass: "app-customer-detail",
        });
        this.dialogRef.afterClosed().subscribe(
            (response) => {
                if (!response) return;
                const cloned = [...this.dataSource.data];
                const index = cloned.findIndex(x => x.id == response.id);
                if (index > -1) {
                    cloned[index] = snakeToCamelObject(response);
                    this.dataSource.data = cloned;
                }
            }
        )
    }
    openCorporateDialog(data): void {
        this.dialogRef = this._matDialog.open(CobCustomerDetailComponent, {
            data: data,
            disableClose: true,
            hasBackdrop: true,
            panelClass: "app-customer-detail",
        });
    }
    getCustomerDetail(id): void {
        //   id = "852FB5E3-D9D8-4292-9A4F-B141E31FAF6F";
        //   id = "99CFE035-51E3-4790-9773-B692CCC792EA";
        //   id = "BE899A66-77E0-46D8-96F6-AC46F141A016";
        this._service
            .forkCustomer360(id)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    const customer360 = response[0];
                    if (customer360 && customer360.entity_id && customer360.entity_member_id) {
                        this.openCorporateDialog(response);
                    } else {
                        this.openRetailDialog(response);
                    }
                },
                (response) => super.onError(response)
            );
    }
    sortData(e): void {
        this.previousFilterState = toggleSort(this.previousFilterState, e.direction);
        this.sort.direction = this.previousFilterState;
        this.getData({
            sort_order: this.previousFilterState,
            sort_by: camelToSnakeCaseText(e.active),
        });
    }
}
