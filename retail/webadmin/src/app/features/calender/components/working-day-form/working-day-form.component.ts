import { Component, OnInit, Inject,ViewEncapsulation } from '@angular/core';
import { FormGroup,  FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { CalendarService } from '@feature/calender/services/calendar.service';
import { WorkingDay } from '@feature/calender/models/working-week.model';
import { WTimeDialogComponent } from '@shared/components/time-control/w-time-dialog.component';

@Component({
  selector: 'app-working-day-form',
  templateUrl: './working-day-form.component.html',
  styleUrls: ['./working-day-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class WorkingDayFormComponent implements OnInit  {
    workingDayForm: FormGroup;
    message: string = "";
    type: string = "";

    private hour = 10;
    private minute = 25;
    private meridien = 'PM';
    constructor(
        public matDialogRef: MatDialogRef<WorkingDayFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: WorkingDay,
        private _service: CalendarService,
        private dialog: MatDialog
    ) {}
  
    ngOnInit(): void {
        this.workingDayForm = new FormGroup({
            id: new FormControl(this.data.id),
            startTime: new FormControl(this.data.startTime, [
                Validators.required
            ]),
            endTime: new FormControl(this.data.endTime, [
                Validators.required
            ]),
            fullDay: new FormControl(this.data.weekday, [Validators.required]),
            remarks: new FormControl(this.data.remarks, [Validators.required]),
            weekDay: new FormControl(this.data.remarks, []),
            status: new FormControl(this.data.status, [
                Validators.required
            ]),
        });
        this.workingDayForm.get('fullDay').valueChanges.subscribe((value)=>{
            if(value){
                this.workingDayForm.get('startTime').disable();
                this.workingDayForm.get('endTime').disable();
                this.workingDayForm.patchValue({startTime:null, endTime:null})
            }else{
                this.workingDayForm.get('startTime').enable();
                this.workingDayForm.get('endTime').enable();
                this.workingDayForm.get('startTime').setValidators(Validators.required)
                this.workingDayForm.get('endTime').setValidators(Validators.required)
            }
        })
    }
    onSubmit() {
        debugger
        this.matDialogRef.close({ data: this.workingDayForm.value });
    }
    public getTime(): string {
        return `${this.hour}:${this.minute} ${this.meridien}`;
    }
    public showPicker(control) {

        let dialogRef = this.dialog.open(WTimeDialogComponent, {
            data: {
                hour: this.hour,
                minute: this.minute,
                meriden: this.meridien
            }
        });

        dialogRef.afterClosed().subscribe(result => {

            // result will be update userTime object or -1 or undefined (closed dialog w/o clicking cancel)
            if (result === undefined) {
                return;
            } else if (result !== -1) {

                this.hour = result.hour;
                this.minute = result.minute;
                this.meridien = result.meriden;
                debugger
                this.workingDayForm.get(control).patchValue(this.getTime())
            }
        });

        return false;
    }
}
