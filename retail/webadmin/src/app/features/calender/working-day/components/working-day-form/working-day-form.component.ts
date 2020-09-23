import {
    Component,
    EventEmitter,
    Inject,
    Injector,
    OnInit,
    Output,
    ViewEncapsulation,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { WorkingDay } from "@feature/calender/models/working-day.model";
import { CalendarService } from "@feature/calender/services/calendar.service";
import { fuseAnimations } from "@fuse/animations";
import { BaseComponent } from "@shared/components/base/base.component";
import { WTimeDialogComponent } from "@shared/components/time-control/w-time-dialog.component";
import { WORKING_DAYS } from "@shared/constants/app.constants";
import { camelToSnakeCase } from "@shared/helpers/global.helper";

@Component({
    selector: "app-working-day-form",
    templateUrl: "./working-day-form.component.html",
    styleUrls: ["./working-day-form.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class WorkingDayFormComponent extends BaseComponent implements OnInit {
    workingDayForm: FormGroup;
    private hour = 10;
    private minute = 25;
    private meridien = "PM";
    workingDaysList: any[] = WORKING_DAYS;
    @Output() sendResponse: EventEmitter<WorkingDay> = new EventEmitter<any>();

    constructor(
        public matDialogRef: MatDialogRef<WorkingDayFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: WorkingDay,
        private _service: CalendarService,
        private dialog: MatDialog,
        injector: Injector
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.workingDayForm = new FormGroup({
            id: new FormControl(this.data.id),
            startTimeLocal: new FormControl(this.data.startTimeLocal, [
                Validators.required,
            ]),
            endTimeLocal: new FormControl(this.data.endTimeLocal, [Validators.required]),
            fullDay: new FormControl(this.data.fullDay),
            remarks: new FormControl(this.data.remarks, [Validators.required]),
            weekDay: new FormControl(this.data.weekday, [Validators.required]),
        });
        this.workingDayForm.get("fullDay").valueChanges.subscribe((value) => {
            if (value) {
                this.workingDayForm.get("startTime").disable();
                this.workingDayForm.get("endTime").disable();
                this.workingDayForm.patchValue({
                    startTime: null,
                    endTime: null,
                });
            } else {
                this.workingDayForm.get("startTime").enable();
                this.workingDayForm.get("endTime").enable();
                this.workingDayForm
                    .get("startTime")
                    .setValidators(Validators.required);
                this.workingDayForm
                    .get("endTime")
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
        minutes= minutes.length < 2 ? `0${minutes}`  : minutes;
        hours= hours.length < 2 ? `0${hours}`  : hours;
        return `${hours}:${minutes}`;
      }
    public getTime(): string {
        return `${this.hour}:${this.minute} ${this.meridien}`;
    }
    public showPicker(control) {
        let dialogRef = this.dialog.open(WTimeDialogComponent, {
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
                debugger
                const time=this.convertTime12to24(this.getTime());
                this.workingDayForm.get(control).patchValue(time);
            }
        });
        return false;
    }
    onSubmit() {
        let model = { ...this.workingDayForm.value };
        model.endTimeLocal= model.endTimeLocal.replace(":", "")
        model.startTimeLocal=model.startTimeLocal.replace(":", ""); 
        model = camelToSnakeCase(model);
        model.full_day = model.full_day  ? 1: 0;
        this.sendResponse.emit(model);
    }
}
