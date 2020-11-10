import { debounceTime, distinctUntilChanged, map, skip } from "rxjs/operators";
import {
    Component,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    Injector,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { fuseAnimations } from "@fuse/animations";
import {
    camelToSentenceCase,
    camelToSnakeCase,
    camelToSnakeCaseText,
    snakeToCamelArray,
    snakeToCamelObject,
} from "@shared/helpers/global.helper";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {
    ConfirmDialogModel,
    ConfirmDialogComponent,
} from "@shared/components/confirm-dialog/confirm-dialog.component";
import { CalendarService } from "@feature/calender/services/calendar.service";
import { Holiday } from "@feature/calender/models/holiday.model";
import { BaseComponent } from "@shared/components/base/base.component";
import { HolidayFormComponent } from "../components/holiday-form/holiday-form.component";
import { CONFIG } from "@config/index";
import { MESSAGES } from "@shared/constants/messages.constant";
import { DATE_FORMAT, MODULES } from "@shared/constants/app.constants";
import * as QueryString from "query-string";
import { FormControl } from "@angular/forms";
import { Pagination } from "@shared/models/pagination.model";
import * as moment from "moment";
@Component({
    selector: "app-holiday",
    templateUrl: "./holiday.component.html",
    styleUrls: ["./holiday.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class HolidayComponent extends BaseComponent implements OnInit {
    dialogRef: any;
    holidays: Holiday[];
    displayedColumns = [
        "holidayDate",
        "description",
        "remarks",
        "createdOn",
        "action",
    ];

    dataSource = new MatTableDataSource<Holiday>();
    pagination: Pagination;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    config: object;
    control: FormControl;
    pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;

    constructor(
        public _matDialog: MatDialog,
        private _service: CalendarService,
        injector: Injector
    ) {
        super(injector, MODULES.HOLIDAYS);
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
            sort_order: "desc",
            sort_by: "holiday_date",
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
        this._service.getHolidays(queryParams).subscribe(
            (response) => {
                this.holidays = snakeToCamelArray(response.data);
                this.dataSource = new MatTableDataSource(this.holidays);
                this.pagination = response.pagination;
                this.pagination.page = this.pagination.page - 1;
            },
            (error) => {
                this._notifier.error(MESSAGES.UNKNOWN);
            }
        );
    }
    openDialog(data): void {
        const _this = this;
        this.dialogRef = this._matDialog
            .open(HolidayFormComponent, {
                data: data ? data : new Holiday(),
                panelClass: "app-holiday-form",
                disableClose: true,
                hasBackdrop: true,
            })
            .componentInstance.sendResponse.subscribe((response) => {
                if (response.id) {
                    _this.editHoliday(response);
                } else {
                    _this.createHoliday(response);
                }
            });
    }

    createHoliday = (model: Holiday): void => {
        this._service.createHoliday(model).subscribe(
            (response) => {
                const data: any = this.dataSource.data;
                data.unshift(snakeToCamelObject(response));
                this.dataSource = new MatTableDataSource(data);
                this._matDialog.closeAll();
                this._notifier.success(MESSAGES.CREATED("Holiday"));
            },
            (response) => {
                this._notifier.error(MESSAGES.UNKNOWN);
            }
        );
    };

    editHoliday = (model: Holiday): void => {
        this._service.editHoliday(model.id, model).subscribe(
            (response) => {
                const index = this.dataSource.data.findIndex(
                    (x) => x.id === model.id
                );
                this._notifier.success(MESSAGES.UPDATED("Holiday"));
                const mapped: any = snakeToCamelObject(response);
                this.holidays[index] = mapped;
                this.dataSource = new MatTableDataSource(this.holidays);
                this._matDialog.closeAll();
            },
            (response) => {
                this._notifier.error(MESSAGES.UNKNOWN);
            }
        );
    };
    confirmDialog(id): void {
        const message = MESSAGES.REMOVE_CONFIRMATION;
        const dialogData = new ConfirmDialogModel("Confirm Action", message);
        const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
            data: dialogData,
            disableClose: true,
            panelClass: "app-confirm-dialog",
            hasBackdrop: true,
        });

        dialogRef.afterClosed().subscribe((status) => {
            if (status) {
                this.deleteHoliday(id);
            }
        });
    }
    deleteHoliday = (id: string): void => {
        this._service.deleteHoliday(id).subscribe(
            (response) => {
                const index = this.dataSource.data.findIndex(
                    (x) => x.id === id
                );
                this.holidays.splice(index, 1);
                this.dataSource = new MatTableDataSource(this.holidays);
                this._notifier.success(MESSAGES.DELETED("Holiday"));
            },
            (response) => {
                this._notifier.error(MESSAGES.UNKNOWN);
            }
        );
    };
    camelToSentenceCase = (text: string): string => {
        return camelToSentenceCase(text);
    };
    camelToSnakeCase = (text: string): object => {
        return camelToSnakeCase(text);
    };
    initSearch(): void {
        this.control.valueChanges.subscribe((text: string) => {
            const date = moment(text).format(DATE_FORMAT);
            if (date == "Invalid date") {
                this._notifier.info(MESSAGES.INVALID_DATE);
                return;
            }
            this.getData({ holiday_date: date });
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
