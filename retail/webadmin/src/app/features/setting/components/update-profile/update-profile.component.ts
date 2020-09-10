import { SettingService } from './../../setting.service';
import { Component, OnInit, ViewEncapsulation, Inject, Output, EventEmitter, Injector } from "@angular/core";
import { FormGroup,  FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {  GENDER_LIST, NATIONALITY_LIST } from "@shared/constants/app.constants";
import { fuseAnimations } from '@fuse/animations';
import { User } from '@feature/entitlement/models/user.model';
import { BaseComponent } from '@shared/components/base/base.component';
import { ValidatorService } from '@shared/services/validator-service/validator.service';

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
    nationalityList: any[]=NATIONALITY_LIST;
    genderList: any[]=GENDER_LIST;
    constructor(
        public matDialogRef: MatDialogRef<UpdateProfileComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        injector: Injector
        ) {
            super(injector);
    }

    ngOnInit(): void {
        this.userForm = new FormGroup({
            id: new FormControl(this.data.id),
            firstName: new FormControl(this.data.firstName, [Validators.required]),
            middleName: new FormControl(this.data.middleName, ),
            lastName: new FormControl(this.data.lastName),
            contactNo: new FormControl(this.data.contactNo,[Validators.required,ValidatorService.numbersOnly]),
            gender: new FormControl(this.data.gender,[Validators.required]),
            email: new FormControl({value:this.data.email, disabled:true}),
            dateOfBirth: new FormControl(this.data.dateOfBirth ? new Date(this.data.dateOfBirth) : null, [Validators.required]),
            nationalityId: new FormControl(this.data.nationalityId, [Validators.required] ),
        });
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
