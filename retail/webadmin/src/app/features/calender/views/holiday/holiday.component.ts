import { HolidayFormComponent } from './../../components/holiday-form/holiday-form.component';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';

import { fuseAnimations } from '@fuse/animations';
import { camelToSentenceCase } from '@shared/helpers/global.helper';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MESSAGES } from '@shared/constants/app.constants';
import { ConfirmDialogModel, ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { CalendarService } from '@feature/calender/services/calendar.service';
import { Holiday } from '@feature/calender/models/holiday.model';


@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class HolidayComponent implements OnInit {
    dialogRef: any;
    holidays: Holiday[];
    message: string = "";
    type: string = "";

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

    
    constructor(
        public _matDialog: MatDialog,
        private _calenderService: CalendarService
    ) {}

    ngOnInit(): void {
        this.getData();
    }

 
    getData() {
        this._calenderService.getHolidays().subscribe(
            (response) => {
                this.holidays = response;
                
                this.dataSource = new MatTableDataSource(response);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (error) => {
                console.log(error);
            }
        );
    }
  
    onCreateDialog(): void {
        this.dialogRef = this._matDialog.open(HolidayFormComponent, {
            data: {
                workingWeek: new Holiday()
            },
            panelClass: "app-holiday-form",
            disableClose: true,
            hasBackdrop: true,
        });
        this.dialogRef.afterClosed().subscribe((response) => {
           
        });
    }
    onEditDialog() {
        // this.dialogRef = this._matDialog.open(UserFormComponent, {
        //     data: {
        //         roles:this.roles,
        //         user
        //     },
        //     panelClass: "app-user-form",
        // });
        // this.dialogRef.afterClosed().subscribe((response) => {
        //     console.log(response);
        // });
    }
    confirmDialog(): void {
        const message = MESSAGES.REMOVE_CONFIRMATION;
        const dialogData = new ConfirmDialogModel("Confirm Action", message);
        const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
            data: dialogData,
            disableClose:true,
            panelClass: "app-confirm-dialog",
            hasBackdrop: true,
        });

        dialogRef.afterClosed().subscribe((dialogResult) => {

        });
    }
    camelToSentenceCase(text){
        return camelToSentenceCase(text)
     }
}
