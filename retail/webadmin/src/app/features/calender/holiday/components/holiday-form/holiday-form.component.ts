import { Holiday } from "@feature/calender/models/holiday.model";
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
import { BaseComponent } from "@shared/components/base/base.component";
import { CalendarService } from "@feature/calender/services/calendar.service";
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { camelToSnakeCase } from '@shared/helpers/global.helper';
import { fuseAnimations } from '@fuse/animations';
import * as moment from 'moment';
import { DATE_FORMAT } from '@shared/constants/app.constants';

@Component({
    selector: "app-holiday-form",
    templateUrl: "./holiday-form.component.html",
    styleUrls: ["./holiday-form.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
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
            holidayDate: new FormControl(this.data.holidayDate, [Validators.required]),
            remarks: new FormControl(this.data.remarks, [Validators.required]),
            description: new FormControl(this.data.remarks, [Validators.required]),
        });
    }
    onSubmit() {
        debugger
      let model = { ...this.holidayForm.value };
      model.holidayDate= moment(model.holidayDate).format(DATE_FORMAT);
      model = camelToSnakeCase(model);

      this.sendResponse.emit(model);
  }
}
