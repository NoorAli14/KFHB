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
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { camelToSnakeCase } from '@shared/helpers/global.helper';
import { fuseAnimations } from '@fuse/animations';
import * as moment from 'moment';
import { DATE_FORMAT, MODULES } from '@shared/constants/app.constants';

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
        injector: Injector
    ) {
        super(injector,MODULES.HOLIDAYS);
        super.ngOnInit();
    }


    ngOnInit(): void {
        this.holidayForm = new FormGroup({
            id: new FormControl(this.data.id),
            holidayDate: new FormControl(this.data.holidayDate, [Validators.required]),
            remarks: new FormControl(this.data.remarks, [Validators.required]),
            description: new FormControl(this.data.description, [Validators.required]),
        });
    }
    onSubmit() {
        let model = { ...this.holidayForm.value };
        model.holidayDate = moment(model.holidayDate).format(DATE_FORMAT);
        model = camelToSnakeCase(model);
        this.sendResponse.emit(model);
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        // this._dialogRef.closeAll();
    }
    onClose() {
        this.sendResponse.emit();
        this.matDialogRef.close()
    }
}
