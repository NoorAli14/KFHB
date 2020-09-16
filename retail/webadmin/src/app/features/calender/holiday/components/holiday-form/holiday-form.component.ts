import { Holiday } from "@feature/calender/models/holiday.model";
import {
    Component,
    EventEmitter,
    Inject,
    Injector,
    OnInit,
    Output,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BaseComponent } from "@shared/components/base/base.component";
import { CalendarService } from "@feature/calender/services/calendar.service";
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { camelToSnakeCase } from '@shared/helpers/global.helper';

@Component({
    selector: "app-holiday-form",
    templateUrl: "./holiday-form.component.html",
    styleUrls: ["./holiday-form.component.scss"],
})
export class HolidayFormComponent extends BaseComponent implements OnInit {
    @Output() sendResponse: EventEmitter<Holiday> = new EventEmitter<any>();
    holidayForm: FormGroup;

    constructor(
        public matDialogRef: MatDialogRef<HolidayFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Holiday,
        private _service: CalendarService,
        private dialog: MatDialog,
        injector: Injector
    ) {
        super(injector);
    }

    
    ngOnInit(): void {
        this.holidayForm = new FormGroup({
            id: new FormControl(this.data.id),
            date: new FormControl(this.data.date, [Validators.required]),
            remarks: new FormControl(this.data.remarks, [Validators.required]),
            description: new FormControl(this.data.remarks, [Validators.required]),
            isRepititive: new FormControl(this.data.isRepititive, [
                Validators.required,
            ]),
        });
    }
    onSubmit() {
      let model = { ...this.holidayForm.value };
      model = camelToSnakeCase(model);
      model.full_day = model.full_day  ? 1: 0;
      model.start_time ="Mon Sep 07 2020 15:10:10 GMT+0500 (Pakistan Standard Time)";
      model.end_time ="Mon Sep 07 2020 15:10:10 GMT+0500 (Pakistan Standard Time)";
      this.sendResponse.emit(model);
  }
}
