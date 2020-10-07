import {
    Component,
    EventEmitter,
    Inject,
    Injector,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { WorkingDay } from '@feature/calender/models/working-day.model';
import { CalendarService } from '@feature/calender/services/calendar.service';
import { fuseAnimations } from '@fuse/animations';
import { BaseComponent } from '@shared/components/base/base.component';
import { WTimeDialogComponent } from '@shared/components/time-control/w-time-dialog.component';
import { MODULES, WORKING_DAYS } from '@shared/constants/app.constants';
import { camelToSnakeCase } from '@shared/helpers/global.helper';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-working-day-form',
    templateUrl: './working-day-form.component.html',
    styleUrls: ['./working-day-form.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class WorkingDayFormComponent extends BaseComponent implements OnDestroy, OnInit {
    workingDayForm: FormGroup;
    private hour = 10;
    private minute = 25;
    private meridien = 'PM';
    workingDaysList: any[] = WORKING_DAYS;
    @Output() sendResponse: EventEmitter<WorkingDay> = new EventEmitter<any>();

    constructor(
        public matDialogRef: MatDialogRef<WorkingDayFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: WorkingDay,
        private dialog: MatDialog,
        injector: Injector
    ) {
        super(injector, MODULES.WORKING_WEEK);
        super.ngOnInit();
    }

    ngOnInit(): void {
        this.workingDayForm = new FormGroup({
            id: new FormControl(this.data.id),
            startTimeLocal: new FormControl({value: this.data.startTimeLocal, disabled: this.data.fullDay ? true : false}, [
                Validators.required,
            ]),
            endTimeLocal: new FormControl({value: this.data.endTimeLocal, disabled: this.data.fullDay ? true : false}, [Validators.required]),
            fullDay: new FormControl(this.data.fullDay),
            remarks: new FormControl(this.data.remarks, [Validators.required]),
            weekDay: new FormControl(this.data.weekDay, [Validators.required]),
        });
        this.workingDayForm.get('fullDay').valueChanges.subscribe((value) => {
            if (value) {
                this.workingDayForm.get('startTimeLocal').disable();
                this.workingDayForm.get('endTimeLocal').disable();
                this.workingDayForm.patchValue({
                    startTimeLocal: null,
                    endTimeLocal: null,
                });
            } else {
                this.workingDayForm.get('startTimeLocal').enable();
                this.workingDayForm.get('endTimeLocal').enable();
                this.workingDayForm
                    .get('startTimeLocal')
                    .setValidators(Validators.required);
                this.workingDayForm
                    .get('endTimeLocal')
                    .setValidators(Validators.required);
            }
        });

       
    }
     convertTime12to24 = (time12h) => {
        const [time, modifier] = time12h.split(' ');
      
        let [hours, minutes] = time.split(':');
      
        if (hours === '12') {
          hours = '00';
        }
      
        if (modifier === 'PM') {
          hours = parseInt(hours, 10) + 12;
        }
        minutes = minutes.length < 2 ? `0${minutes}`  : minutes;
        hours = hours.length < 2 ? `0${hours}`  : hours;
        return `${hours}:${minutes}`;
      }
    public getTime(): string {
        return `${this.hour}:${this.minute} ${this.meridien}`;
    }
    public showPicker(control): any {
        const dialogRef = this.dialog.open(WTimeDialogComponent, {
            data: {
                hour: this.hour,
                minute: this.minute,
                meriden: this.meridien,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result === undefined) {
                return;
            } else if (result !== -1) {
                this.hour = result.hour;
                this.minute = result.minute;
                this.meridien = result.meriden;
                const time = this.convertTime12to24(this.getTime());
                this.workingDayForm.get(control).patchValue(time);
            }
        });
        return false;
    }
    onSubmit(): void {
        let model = { ...this.workingDayForm.value };
        if (!model.fullDay){
            model.endTimeLocal = model.endTimeLocal.replace(/\D/g,'');
            model.startTimeLocal = model.startTimeLocal.replace(/\D/g,'');
        }
        model = camelToSnakeCase(model);
        model.full_day = model.full_day  ? 1 : 0;
        this.sendResponse.emit(model);
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        // this._dialogRef.closeAll();
    }
    onClose(): void{
        this.sendResponse.emit();
        this.matDialogRef.close();
    }
}
