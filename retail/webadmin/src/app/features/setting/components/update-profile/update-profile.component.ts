import { SettingService } from './../../setting.service';
import { Component, OnInit, ViewEncapsulation, Inject, Output, EventEmitter } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MESSAGES, GENDER_LIST, NATIONALITY_LIST } from "@shared/constants/app.constants";
import { fuseAnimations } from '@fuse/animations';
import { User } from '@feature/entitlement/models/user.model';
import { UserService } from '@feature/entitlement/user/services/user.service';
import { BaseComponent } from '@shared/components/base/base.component';

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
        private _settingService: SettingService
    ) {
        super()
    }

    ngOnInit(): void {
        this.userForm = new FormGroup({
            id: new FormControl(this.data.id),
            firstName: new FormControl(this.data.firstName, ),
            middleName: new FormControl(this.data.middleName, ),
            lastName: new FormControl(this.data.lastName),
            contactNo: new FormControl(this.data.contactNo,),
            gender: new FormControl(this.data.gender),
            status: new FormControl(this.data.status),
            email: new FormControl(this.data.email, [
                Validators.email,
            ]),
            dateOfBirth: new FormControl(new Date(this.data.dateOfBirth),),
            nationalityId: new FormControl(Number(this.data.nationalityId), ),
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
