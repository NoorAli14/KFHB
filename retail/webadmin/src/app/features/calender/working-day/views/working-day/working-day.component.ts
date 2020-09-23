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
import { WorkingDay } from "@feature/calender/models/working-day.model";
import { CalendarService } from "@feature/calender/services/calendar.service";
import { fuseAnimations } from "@fuse/animations";
import { BaseComponent } from "@shared/components/base/base.component";
import {
    ConfirmDialogComponent,
    ConfirmDialogModel,
} from "@shared/components/confirm-dialog/confirm-dialog.component";
import { MESSAGES } from "@shared/constants/messages.constant";
import {
    camelToSentenceCase,
    camelToSnakeCase,
    snakeToCamelArray,
    snakeToCamelObject,
} from "@shared/helpers/global.helper";
import { WorkingDayFormComponent } from "../../components/working-day-form/working-day-form.component";

@Component({
    selector: "app-working-day",
    templateUrl: "./working-day.component.html",
    styleUrls: ["./working-day.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class WorkingDayComponent extends BaseComponent implements OnInit {
    dialogRef: any;
    workingDays: WorkingDay[];
    displayedColumns = [
        "weekDay",
        "startTimeLocal",
        "endTimeLocal",
        "fullDay",
        "remarks",
        "status",
        "actions",
    ];
    pageSize: number = CONFIG.PAGE_SIZE;
    pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
    dataSource = new MatTableDataSource<WorkingDay>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    constructor(
        public _matDialog: MatDialog,
        private _service: CalendarService,
        injector: Injector
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        this._service.getWorkingDays().subscribe(
            (response) => {
                this.workingDays = snakeToCamelArray(response);
                this.workingDays = this.workingDays.map((x) => this.convertData(x));
                this.dataSource = new MatTableDataSource(this.workingDays);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (error) => {
                console.log(error);
            }
        );
    }
    convertData(item) {
        return {
            ...item,
            startTimeLocal: this.tConvert(item.startTimeLocal),
            endTimeLocal: this.tConvert(item.endTimeLocal),
        };
    }
    openDialog(data): void {
        var _this = this;
        this.dialogRef = this._matDialog
            .open(WorkingDayFormComponent, {
                data: data ? data : new WorkingDay(),
                panelClass: "app-working-day-form",
                disableClose: true,
                hasBackdrop: true,
            })
            .componentInstance.sendResponse.subscribe((response) => {
                if (!response) {
                    this._errorEmitService.emit("", "");
                } else if (response.id) {
                    _this.editWorkingDay(response);
                } else {
                    _this.createWorkingDay(response);
                }
            });
    }
    insert(str, index, value) {
        return str.substr(0, index) + value + str.substr(index);
    }
    tConvert(time) {
        time = this.insert(time, 2, ":");
        time = time
            .toString()
            .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) {
            // If time format correct
            time = time.slice(1); // Remove full string match value
            time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(""); // return adjusted time or original string
    }

    createWorkingDay(model: WorkingDay) {
        this._service.createWorkingDay(model).subscribe(
            (response) => {
                const data: any = this.dataSource.data;
                data.unshift(this.convertData(snakeToCamelObject(response)));
                this.updateGrid(data);
                this.errorType = "success";
                this.responseMessage = MESSAGES.CREATED("Working Day");
                this._matDialog.closeAll();
                this.hideMessage();
            },
            (response) => {
                if (response.error && response.error.statusCode == 409) {
                    this._errorEmitService.emit(MESSAGES.EXISTS('Working day'), "error");
                } else
                    this._errorEmitService.emit(MESSAGES.UNKNOWN(), "error");
            }
        );
    }
    hideMessage() {
        setTimeout(() => {
            this.responseMessage = "";
        }, 2000);
    }
    editWorkingDay(model: WorkingDay) {
        this._service.editWorkingDay(model.id, model).subscribe(
            (response) => {
                this.errorType = "success";
                this.responseMessage = MESSAGES.UPDATED("Working Day");
                const index = this.dataSource.data.findIndex(
                    (x) => x.id == model.id
                );
                this.hideMessage();
                const mapped: any = this.convertData(snakeToCamelObject(response))
                this.workingDays[index] = mapped;
                this.updateGrid(this.workingDays);
                this._matDialog.closeAll();
            },
            (response) => {
                this._errorEmitService.emit(MESSAGES.UNKNOWN(), "error");
            }
        );
    }
    confirmDialog(type, id): void {
        const message = MESSAGES.REMOVE_CONFIRMATION();
        const dialogData = new ConfirmDialogModel("Confirm Action", message);
        const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
            data: dialogData,
            disableClose: true,
            panelClass: "app-confirm-dialog",
            hasBackdrop: true,
        });

        dialogRef.afterClosed().subscribe((status) => {
            if (status) {
                this.deleteWorkingDay(id);
            }
        });
    }
    deleteWorkingDay(id: string) {
        this._service.deleteWorkingDay(id).subscribe(
            (response) => {
                const index = this.dataSource.data.findIndex((x) => x.id == id);
                this.workingDays.splice(index, 1);
                this.updateGrid(this.workingDays);
                this.errorType = "success";
                this.hideMessage();
                this.responseMessage = MESSAGES.DELETED("Working Day");
            },
            (response) => super.onError(response)
        );
    }
    camelToSentenceCase(text) {
        return camelToSentenceCase(text);
    }
    camelToSnakeCase(text) {
        return camelToSnakeCase(text);
    }
    updateGrid(data) {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}
