import { isUUID, toggleSort } from "@shared/helpers/global.helper";
import { Leave } from "./../../../models/leave.model";
import {
    Component,
    Injector,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { CONFIG } from "@config/index";
import { CalendarService } from "@feature/calender/services/calendar.service";
import { BaseComponent } from "@shared/components/base/base.component";
import {
    ConfirmDialogModel,
    ConfirmDialogComponent,
} from "@shared/components/confirm-dialog/confirm-dialog.component";
import {
    snakeToCamelArray,
    camelToSentenceCase,
    camelToSnakeCase,
    snakeToCamelObject,
    getName,
    camelToSnakeCaseText,
} from "@shared/helpers/global.helper";
import { MESSAGES } from "@shared/constants/messages.constant";
import { LeaveFormComponent } from "../../components/leave-form/leave-form.component";
import { fuseAnimations } from "@fuse/animations";
import { MODULES } from "@shared/constants/app.constants";
import { Pagination } from "@shared/models/pagination.model";
import { FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import * as QueryString from "query-string";
import { MatSortDirection } from "@shared/enums/app.enum";

@Component({
    selector: "app-leave",
    templateUrl: "./leave.component.html",
    styleUrls: ["./leave.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class LeaveComponent extends BaseComponent implements OnInit {
    dialogRef: any;
    leaves: Leave[];
    displayedColumns = [
        "userId",
        "leaveTypeId",
        "startDate",
        "endDate",
        "action",
    ];
    previousFilterState: MatSortDirection;

    pageSize: number = CONFIG.PAGE_SIZE;
    pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
    dataSource = new MatTableDataSource<Leave>();
    pagination: Pagination;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    leaveTypes: Array<any>;
    config: object;
    control: FormControl;
    filteredUser: Array<any>;
    constructor(
        public _matDialog: MatDialog,
        private _service: CalendarService,
        injector: Injector
    ) {
        super(injector, MODULES.LEAVES);
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
            sort_order: MatSortDirection.desc,
            sort_by: "created_on",
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
        this._service.forkLeaveData(queryParams).subscribe(
            (response) => {
                this.leaves = snakeToCamelArray(response[0].data);
                this.pagination = response[0].pagination;
                this.leaveTypes = snakeToCamelArray(response[1]);
                this.dataSource = new MatTableDataSource(
                    snakeToCamelArray(this.leaves)
                );

                this.pagination.page = this.pagination.page - 1;
            },
            (response) => super.onError(response)
        );
    }
    getLeaveType(id): string {
        return getName(id, "name", this.leaveTypes);
    }

    openDialog(data): void {
        const _this = this;
        this.dialogRef = this._matDialog
            .open(LeaveFormComponent, {
                data: {
                    leave: data ? data : new Leave(),
                    leaveTypes: this.leaveTypes
                },
                panelClass: "app-leave-form",
                disableClose: true,
                hasBackdrop: true,
            })
            .componentInstance.sendResponse.subscribe((response) => {
                if (response.id) {
                    _this.editLeave(response);
                } else {
                    _this.createLeave(response);
                }
            });
    }

    createLeave(model: Leave): void {
        this._service.createLeave(model).subscribe(
            (response) => {
                const data: any = this.dataSource.data;
                data.unshift(snakeToCamelObject(response));

                this.updateGrid(data);
                this._matDialog.closeAll();
                this._notifier.success(MESSAGES.CREATED("Leave"));
            },
            (response) => super.onError(response)
        );
    }

    editLeave(model: Leave): void {
        this._service.editLeave(model.id, model).subscribe(
            (response) => {
                const index = this.dataSource.data.findIndex(
                    (x) => x.id === model.id
                );
                const mapped: any = snakeToCamelObject(response);
                this._notifier.success(MESSAGES.UPDATED("Leave"));
                this.leaves[index] = mapped;
                this.updateGrid(this.leaves);
                this._matDialog.closeAll();
            },
            (response) => super.onError(response)
        );
    }
    confirmDialog(type, id): void {
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
                this.deleteLeave(id);
            }
        });
    }
    deleteLeave(id: string): void {
        this._service.deleteLeave(id).subscribe(
            (response) => {
                const index = this.dataSource.data.findIndex(
                    (x) => x.id === id
                );
                this.leaves.splice(index, 1);
                this.updateGrid(this.leaves);
                this._notifier.success(MESSAGES.DELETED("Leave"));
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
    onSelectUser(id?) {
        if (id) {
            this.getData({ user_id: id });
        } else this.getData({});
    }
    initSearch(): void {
        this.control.valueChanges
            .pipe(debounceTime(400), distinctUntilChanged())
            .subscribe((value) => {
                const filterValue = value?.toLowerCase();
                if (isUUID(filterValue)) return;
                this.filteredUser = [];
                const queryParams = QueryString.stringify({
                    first_name: filterValue,
                });
                this._service.getUsers(queryParams).subscribe((response) => {
                    this.filteredUser = snakeToCamelArray(response.data);
                });
            });
    }
    displayFn = (id: string): string => {
        if (!id) {
            return;
        }
        const user = this.filteredUser.find((item) => item.id === id);
        return user ? `${user.firstName} ${user.lastName}` : "";
    };
    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    sortData(e): void {
        this.previousFilterState = toggleSort(this.previousFilterState, e.direction);
        this.sort.direction = this.previousFilterState;
        this.getData({
            sort_order: this.previousFilterState,
            sort_by: camelToSnakeCaseText(e.active),
        });
    }
    onPageFired(data): void {
        this.getData({ page: data["pageIndex"] + 1, limit: data["pageSize"] });
    }
}
