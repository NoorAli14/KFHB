import { Component, EventEmitter, Inject, Injector, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Leave } from '@feature/calender/models/leave.model';
import { fuseAnimations } from '@fuse/animations';
import { BaseComponent } from '@shared/components/base/base.component';
import { DATE_FORMAT, MODULES } from '@shared/constants/app.constants';
import { camelToSnakeCase, cloneDeep, getName } from '@shared/helpers/global.helper';
import * as moment from 'moment';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class LeaveFormComponent extends BaseComponent implements OnInit {

  @Output() sendResponse: EventEmitter<Leave> = new EventEmitter<any>();
  leaveForm: FormGroup;
  leaveTypes: Array<any>;
  users: Array<any>;
  filteredUser: Array<any>;
  isAdmin=false;
  constructor(
    public matDialogRef: MatDialogRef<LeaveFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    injector: Injector
  ) {
    super(injector,MODULES.LEAVES);
    super.ngOnInit();
  }

  ngOnInit(): void {
    this.leaveTypes = this.data.leaveTypes;
    this.users = this.data.users?.filter(x=>x.roles.find(x=>x.name!='SUPER ADMIN'));
    this.filteredUser = this.data.users?.filter(x=>x.roles.find(x=>x.name!='SUPER ADMIN'));
    
    this._errorEmitService.currentMessage
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((item) => {
        this.errorType = item.type;
        this.responseMessage = item.message;
      });

    this.leaveForm = new FormGroup({
      id: new FormControl(this.data.leave.id),
      startDate: new FormControl(this.data.leave.startDate, [
        Validators.required,
        this.confirmPasswordValidator.bind(this),
      ]),
      endDate: new FormControl(this.data.leave.endDate, [
        Validators.required,
        this.confirmPasswordValidator.bind(this),
      ]),
      leaveTypeId: new FormControl(this.data.leave.leaveTypeId, [Validators.required]),
      remarks: new FormControl(this.data.leave.remarks, [Validators.required]),
      userId: new FormControl(this.data.leave.userId, [Validators.required]),
    });
     this.isAdmin= this._authUserService.User.roles.find(x=>x.name==='SUPER ADMIN')?true: false;
    if(!this.isAdmin){
      this.leaveForm.get('userId').setValue(this._authUserService.User.id);
    }
    this.leaveForm.get('userId').valueChanges.subscribe((value=>{
      this.filteredUser=  this._mapperService.filterData(this.users,'firstName',value)
    }));
  }
  displayFn=(id: string): string=> {
    return getName(id,'firstName',cloneDeep(this.users))
}
  confirmPasswordValidator(control: FormControl): { [s: string]: boolean } {
    if (
      this.leaveForm &&
      this.leaveForm.controls.endDate.value && 
      this.leaveForm.controls.startDate.value
    ) {
      const start = moment(this.leaveForm.controls.startDate.value).format(DATE_FORMAT);
      const end = moment(this.leaveForm.controls.endDate.value).format(DATE_FORMAT);
      var isAfter = moment(end).isSameOrAfter(start);
      if (isAfter) {
        this.leaveForm.controls.startDate.setErrors(null)
        this.leaveForm.controls.endDate.setErrors(null)
      }
      return isAfter ? null : { compareDate: true };
    }
    return null;
  }
  onSubmit() {

    let model = { ...this.leaveForm.value };
    model.startDate = moment(model.startDate).format(DATE_FORMAT);
    model.endDate = moment(model.endDate).format(DATE_FORMAT);
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
