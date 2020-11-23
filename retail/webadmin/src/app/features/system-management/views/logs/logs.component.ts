import {
    Component,
    Injector,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { CONFIG } from "@config/index";
import { SystemManagementService } from "@feature/system-management/system.service";
import { fuseAnimations } from "@fuse/animations";
import { BaseComponent } from "@shared/components/base/base.component";
import { MODULES } from "@shared/constants/app.constants";
import {
    snakeToCamelArray,
    camelToSentenceCase,
    camelToSnakeCase,
    camelToSnakeCaseText,
} from "@shared/helpers/global.helper";
import { Pagination } from "@shared/models/pagination.model";
import * as QueryString from "query-string";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
    selector: "app-logs",
    templateUrl: "./logs.component.html",
    styleUrls: ["./logs.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class LogsComponent extends BaseComponent implements OnInit {
    dialogRef: any;
    auditLogs: any[];
    displayedColumns = [
        "auditCode",
        "userId",
        "tenantId",
        "auditText",
        "createdOn",
    ];
    pageSize: number = CONFIG.PAGE_SIZE;
    pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
    dataSource = new MatTableDataSource<any>();
    pagination: Pagination;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    config: object;
    control: FormControl;
    filteredUser: Array<any>;
    constructor(
        public _matDialog: MatDialog,
        private _service: SystemManagementService,
        injector: Injector
    ) {
        super(injector, MODULES.SYSTEM_MANAGEMENT);
        super.ngOnInit();
    }

    ngOnInit(): void {
        this.config = this.initParams();
        this.getData(this.config);
        this.pagination = new Pagination();
        this.control = new FormControl();
        this.initSearch();
    }

    initParams(): object {
        return {
            limit: CONFIG.PAGE_SIZE,
            page: 1,
            sort_order: "asc",
            sort_by: "audit_code",
        };
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
    getData(params): void {
        const queryParams = QueryString.stringify(
            this.createQueryObject(params)
        );
        this._service.getAuditLogs(queryParams).subscribe(
            (response) => {
                this.auditLogs = snakeToCamelArray(response.data);
                this.dataSource = new MatTableDataSource(
                    snakeToCamelArray(this.auditLogs)
                );
                this.pagination.page = this.pagination.page - 1;
            },
            (response) => super.onError(response)
        );
    }

    camelToSentenceCase(text): string {
        return camelToSentenceCase(text);
    }
    camelToSnakeCase(text): object {
        return camelToSnakeCase(text);
    }
    updateGrid(data): void {
        this.dataSource.data = data;
    }

    initSearch(): void {
        this.control.valueChanges
            .pipe(debounceTime(400), distinctUntilChanged())
            .subscribe((value) => {
                const filterValue = value?.toLowerCase();
                this.filteredUser = [];
                const queryParams = QueryString.stringify({
                    first_name: filterValue,
                });
            });
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    sortData(e): void {
        this.getData({
            sort_order: e.direction ? e.direction : "asc",
            sort_by: camelToSnakeCaseText(e.active),
        });
    }
    onPageFired(data): void {
        this.getData({ page: data["pageIndex"] + 1, limit: data["pageSize"] });
    }
}
