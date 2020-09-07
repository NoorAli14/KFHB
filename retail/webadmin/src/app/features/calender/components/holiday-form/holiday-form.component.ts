import { BaseComponent } from '@shared/components/base/base.component';
import { Component, OnInit, ViewEncapsulation, Inject, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { WorkingDay } from '@feature/calender/models/working-week.model';
import { CalendarService } from '@feature/calender/services/calendar.service';
import { WTimeDialogComponent } from '@shared/components/time-control/w-time-dialog.component';
import { Holiday } from '@feature/calender/models/holiday.model';

@Component({
  selector: 'app-holiday-form',
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class HolidayFormComponent extends BaseComponent implements OnInit {
  holidayForm: FormGroup;
  
  

  constructor(
      public matDialogRef: MatDialogRef<HolidayFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Holiday,
      private _service: CalendarService,
      private dialog: MatDialog
      ,
      injector: Injector
      ) {
          super(injector);
  }

  ngOnInit(): void {
      this.holidayForm = new FormGroup({
          id: new FormControl(this.data.id),
          date: new FormControl(this.data.date, [
              Validators.required
          ]),
          type: new FormControl(this.data.type, [
              Validators.required
          ]),
          detail: new FormControl(this.data.detail, [Validators.required]),
          remarks: new FormControl(this.data.remarks, [Validators.required]),
          isRepititive: new FormControl(this.data.isRepititive, [Validators.required]),
          status: new FormControl(this.data.status, [
              Validators.required
          ]),
      });
  }
  onSubmit() {
      this.matDialogRef.close({ data: this.holidayForm.value });
  }
}
