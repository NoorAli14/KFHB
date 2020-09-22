import { Component, OnInit, ViewEncapsulation, ViewChild, Injector } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';

import { fuseAnimations } from '@fuse/animations';
import { camelToSentenceCase, camelToSnakeCase, snakeToCamelArray } from '@shared/helpers/global.helper';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogModel, ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { CalendarService } from '@feature/calender/services/calendar.service';
import { Holiday } from '@feature/calender/models/holiday.model';
import { BaseComponent } from '@shared/components/base/base.component';
import { HolidayFormComponent } from '../components/holiday-form/holiday-form.component';
import { CONFIG } from '@config/index';
import { MESSAGES } from '@shared/constants/messages.constant';


@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class HolidayComponent extends BaseComponent implements OnInit {
    dialogRef: any;
    holidays: Holiday[];
    displayedColumns = [
        "date",
        "type",
        "detail",
        "isRepititive",
        "remarks",
        "status",
        "actions",
    ];

    dataSource = new MatTableDataSource<Holiday>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    pageSize: number = CONFIG.PAGE_SIZE;
    pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
  
    constructor(
        public _matDialog: MatDialog,
        private _service: CalendarService
        ,
        injector: Injector
        ) {
            super(injector);
    }

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        this._service.getHolidays().subscribe(
            (response) => {
                this.holidays = snakeToCamelArray(response);
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
            .open(HolidayFormComponent, {
                data: new Holiday(),
                panelClass: "app-holiday-form",
                disableClose: true,
                hasBackdrop: true,
            })
            .componentInstance.sendResponse.subscribe((response) => {
                if (response.id) {
                    _this.editWorkingDay(response);
                } else {
                    _this.createWorkingDay(response);
                }
            });
    }
 
    createWorkingDay(model: Holiday) {
        this._service.createHoliday(model).subscribe(
            (response) => {
                const data = this.dataSource.data;
                data.unshift(response);
                this.updateGrid(data);
                this.errorType = "success";
                this.responseMessage = MESSAGES.CREATED("Holiday");
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
    editWorkingDay(model: Holiday) {
        this._service.editHoliday(model.id, model).subscribe(
            (response) => {
                this.errorType = "success";
                this.responseMessage = MESSAGES.UPDATED("Holiday");
                const index = this.dataSource.data.findIndex(
                    (x) => x.id == model.id
                );
                this.hideMessage();
                this.holidays[index] = response;
                this.updateGrid(this.holidays);
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
        this._service.deleteWorkingDay(id).subscribe(
            (response) => {
                const index = this.dataSource.data.findIndex((x) => x.id == id);
                this.holidays.splice(index, 1);
                this.updateGrid(this.holidays);
                this.errorType = "success";
                this.hideMessage();
                this.responseMessage = MESSAGES.DELETED("Holiday");
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
