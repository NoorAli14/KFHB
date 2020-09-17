import { Leave } from './../../../models/leave.model';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CONFIG } from '@config/index';
import { CalendarService } from '@feature/calender/services/calendar.service';
import { WorkingDayFormComponent } from '@feature/calender/working-day/components/working-day-form/working-day-form.component';
import { BaseComponent } from '@shared/components/base/base.component';
import { ConfirmDialogModel, ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { snakeToCamelArray, camelToSentenceCase, camelToSnakeCase } from '@shared/helpers/global.helper';
import { MESSAGES } from '@shared/constants/messages.constant';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent extends BaseComponent implements OnInit {

  dialogRef: any;
    leaves: Leave[];
    displayedColumns = [
        "leaveType",
        "status",
        "createdOn",
        "actions",
    ];
    pageSize: number = CONFIG.PAGE_SIZE;
    pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
    dataSource = new MatTableDataSource<Leave>();
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
        this._service.getLeaves().subscribe(
            (response) => {
                this.leaves = snakeToCamelArray(response);
                this.dataSource = new MatTableDataSource(
                    snakeToCamelArray(response)
                );
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (error) => {
                console.log(error);
            }
        );
    }
    openDialog(): void {
        var _this = this;
        this.dialogRef = this._matDialog
            .open(WorkingDayFormComponent, {
                data: new Leave(),
                panelClass: "app-working-day-form",
            })
            .componentInstance.sendResponse.subscribe((response) => {
                if (response.id) {
                    _this.editWorkingDay(response);
                } else {
                    _this.createWorkingDay(response);
                }
            });
    }
 
    createWorkingDay(model: Leave) {
        this._service.createLeave(model).subscribe(
            (response) => {
                const data = this.dataSource.data;
                data.unshift(response);
                this.updateGrid(data);
                this.errorType = "success";
                this.responseMessage = MESSAGES.CREATED("Leave");
                this._matDialog.closeAll();
                this.hideMessage();
            },
            (response) => {
                this._errorEmitService.emit(MESSAGES.UNKNOWN(), "error");
            }
        );
    }
    hideMessage() {
        setTimeout(() => {
            this.responseMessage = "";
        }, 2000);
    }
    editWorkingDay(model: Leave) {
        this._service.editLeave(model.id, model).subscribe(
            (response) => {
                this.errorType = "success";
                this.responseMessage = MESSAGES.UPDATED("Leave");
                const index = this.dataSource.data.findIndex(
                    (x) => x.id == model.id
                );
                this.hideMessage();
                this.leaves[index] = response;
                this.updateGrid(this.leaves);
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
               this.deleteWorkingDay(id)
            }
        });
    }
    deleteWorkingDay(id: string) {
        this._service.deleteLeave(id).subscribe(
            (response) => {
                const index = this.dataSource.data.findIndex((x) => x.id == id);
                this.leaves.splice(index, 1);
                this.updateGrid(this.leaves);
                this.errorType = "success";
                this.hideMessage();
                this.responseMessage = MESSAGES.DELETED("Leave");
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
