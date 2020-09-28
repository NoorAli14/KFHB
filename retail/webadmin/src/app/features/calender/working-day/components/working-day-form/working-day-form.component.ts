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
import { WorkingDay } from "@feature/calender/models/working-week.model";
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
            startTime: new FormControl(this.data.startTime, [
                Validators.required,
            ]),
            endTime: new FormControl(this.data.endTime, [Validators.required]),
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
                this.workingDayForm.get(control).patchValue(this.getTime());
            }
        });
        return false;
    }
    onSubmit() {
        let model = { ...this.workingDayForm.value };
        model = camelToSnakeCase(model);
        model.full_day = model.full_day  ? 1: 0;
        model.start_time ="Mon Sep 07 2020 15:10:10 GMT+0500 (Pakistan Standard Time)";
        model.end_time ="Mon Sep 07 2020 15:10:10 GMT+0500 (Pakistan Standard Time)";
        this.sendResponse.emit(model);
    }
}
