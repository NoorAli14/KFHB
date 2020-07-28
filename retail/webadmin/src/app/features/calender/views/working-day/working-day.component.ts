import { WorkingDayFormComponent } from './../../components/working-day-form/working-day-form.component';
import {  WorkingDay } from './../../models/working-week.model';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MESSAGES } from '@shared/constants/app.constants';
import { ConfirmDialogModel, ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { camelToSentenceCase } from '@shared/helpers/global.helper';
import { MatDialog } from '@angular/material/dialog';
import { CalendarService } from '@feature/calender/services/calendar.service';

@Component({
  selector: 'app-working-day',
  templateUrl: './working-day.component.html',
  styleUrls: ['./working-day.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class WorkingDayComponent implements OnInit {
    dialogRef: any;
    workingWeeks: WorkingDay[];
    message: string = "";
    type: string = "";

    displayedColumns = [
        "weekDay",
        "startTime",
        "endTime",
        "fullDay",
        "remarks",
        "status",
        "actions",
    ];

    dataSource = new MatTableDataSource<WorkingDay>();
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
        this._calenderService.getWorkingDays().subscribe(
            (response) => {
                this.workingWeeks = response;
                
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
        this.dialogRef = this._matDialog.open(WorkingDayFormComponent, {
            data: {
                workingWeek: new WorkingDay()
            },
            panelClass: "app-working-day-form",
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
