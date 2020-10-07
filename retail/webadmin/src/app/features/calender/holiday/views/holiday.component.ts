import { map } from 'rxjs/operators';
import { Component, OnInit, ViewEncapsulation, ViewChild, Injector } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';

import { fuseAnimations } from '@fuse/animations';
import { camelToSentenceCase, camelToSnakeCase, snakeToCamelArray, snakeToCamelObject } from '@shared/helpers/global.helper';
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
import * as moment from 'moment';
import { DATE_FORMAT, MODULES } from '@shared/constants/app.constants';


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
        'holidayDate',
        'description',
        'remarks',
        'action',
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
            super(injector, MODULES.HOLIDAYS);
            super.ngOnInit();
    }

    ngOnInit(): void {
        this.getData();
    }

    getData = (): void => {
        this._service.getHolidays().subscribe(
            (response) => {
                this.holidays = snakeToCamelArray(response);
                this.dataSource = new MatTableDataSource(    this.holidays);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (error) => {
                console.log(error);
            }
        );
    }
    openDialog(data): void {
        const _this = this;
        this.dialogRef = this._matDialog
            .open(HolidayFormComponent, {
                data: data ? data : new Holiday(),
                panelClass: 'app-holiday-form',
                disableClose: true,
                hasBackdrop: true,
            })
            .componentInstance.sendResponse.subscribe((response) => {
                if (!response) {
                    this._errorEmitService.emit('', '');
                } else if (response.id) {
                    _this.editHoliday(response);
                } else {
                    _this.createHoliday(response);
                }
            });
    }
 
    createHoliday  = (model: Holiday): void => {
        this._service.createHoliday(model).subscribe(
            (response) => {
                const data: any = this.dataSource.data;
                data.unshift(snakeToCamelObject(response));
                this.updateGrid(data);
                this.errorType = 'success';
                this.responseMessage = MESSAGES.CREATED('Holiday');
                this._matDialog.closeAll();
                this.hideMessage();
            },
            (response) => {
                this._errorEmitService.emit(MESSAGES.UNKNOWN(), 'error');
            }
        );
    }
    hideMessage  = (): void => {
        setTimeout(() => {
            this.responseMessage = '';
        }, 2000);
    }
    editHoliday  = (model: Holiday): void => {
        this._service.editHoliday(model.id, model).subscribe(
            (response) => {
                this.errorType = 'success';
                this.responseMessage = MESSAGES.UPDATED('Holiday');
                const index = this.dataSource.data.findIndex(
                    (x) => x.id === model.id
                );
                this.hideMessage();
                const mapped: any = snakeToCamelObject(response);
                this.holidays[index] = mapped;
                this.updateGrid(this.holidays);
                this._matDialog.closeAll();
            },
            (response) => {
                this._errorEmitService.emit(MESSAGES.UNKNOWN(), 'error');
            }
        );
    }
    confirmDialog( id): void {
        const message = MESSAGES.REMOVE_CONFIRMATION();
        const dialogData = new ConfirmDialogModel('Confirm Action', message);
        const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
            data: dialogData,
            disableClose: true,
            panelClass: 'app-confirm-dialog',
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
                const index = this.dataSource.data.findIndex((x) => x.id === id);
                this.holidays.splice(index, 1);
                this.updateGrid(this.holidays);
                this.errorType = 'success';
                this.hideMessage();
                this.responseMessage = MESSAGES.DELETED('Holiday');
            },
            (response) => super.onError(response)
        );
    }
    camelToSentenceCase  = (text: string): string =>  {
        return camelToSentenceCase(text);
    }
    camelToSnakeCase = (text: string): object => {
        return camelToSnakeCase(text);
    }
    updateGrid = (data): void =>  {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}
