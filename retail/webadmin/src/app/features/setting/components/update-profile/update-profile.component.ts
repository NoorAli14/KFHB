import { SettingService } from './../../setting.service';
import { Component, OnInit, ViewEncapsulation, Inject, Output, EventEmitter, Injector } from "@angular/core";
import { FormGroup,  FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {  GENDER_LIST, NATIONALITY_LIST } from "@shared/constants/app.constants";
import { fuseAnimations } from '@fuse/animations';
import { User } from '@feature/entitlement/models/user.model';
import { BaseComponent } from '@shared/components/base/base.component';
import { ValidatorService } from '@shared/services/validator-service/validator.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
   encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class UpdateProfileComponent extends BaseComponent implements OnInit {

    userForm: FormGroup;
    response: User;
    @Output() sendResponse: EventEmitter<User> = new EventEmitter<any>();
    nationalityList: any[];
    genderList: any[]=GENDER_LIST;
    constructor(
        public matDialogRef: MatDialogRef<UpdateProfileComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        injector: Injector
        ) {
            super(injector);
    }

    ngOnInit(): void {
        this._errorEmitService.currentMessage
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((item) => {
            this.errorType = item.type;
            this.responseMessage = item.message;
        });
        this.userForm = new FormGroup({
            id: new FormControl(this.data.user.id),
            firstName: new FormControl(this.data.user.firstName, [Validators.required]),
            middleName: new FormControl(this.data.user.middleName, ),
            lastName: new FormControl(this.data.user.lastName),
            contactNo: new FormControl(this.data.user.contactNo,[Validators.required,ValidatorService.numbersOnly]),
            gender: new FormControl(this.data.user.gender,[Validators.required]),
            email: new FormControl({value:this.data.user.email, disabled:true}),
            dateOfBirth: new FormControl(this.data.user.dateOfBirth ? new Date(this.data.user.dateOfBirth) : null, [Validators.required]),
            nationalityId: new FormControl(this.data.user.nationalityId, [Validators.required] ),
        });
        this.nationalityList= this.data.nationalities
    }
   
    onSubmit() {
        const model = { ...this.userForm.value };
        model.dateOfBirth= new Date(model.dateOfBirth).toLocaleDateString()
        this.sendResponse.emit(model);
    }
    onClose() {
        this.matDialogRef.close(this.response);
    }
}
