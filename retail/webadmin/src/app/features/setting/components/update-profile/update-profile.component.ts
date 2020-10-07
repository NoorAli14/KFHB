import { SettingService } from './../../setting.service';
import { Component, OnInit, ViewEncapsulation, Inject, Output, EventEmitter, Injector, OnDestroy } from '@angular/core';
import { FormGroup,  FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  DATE_FORMAT, GENDER_LIST, NATIONALITY_LIST } from '@shared/constants/app.constants';
import { fuseAnimations } from '@fuse/animations';
import { User } from '@feature/entitlement/models/user.model';
import { BaseComponent } from '@shared/components/base/base.component';
import { ValidatorService } from '@shared/services/validator-service/validator.service';
import { takeUntil } from 'rxjs/operators';
import { getName } from '@shared/helpers/global.helper';
import { cloneDeep } from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
   encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class UpdateProfileComponent extends BaseComponent implements OnDestroy, OnInit {

    userForm: FormGroup;
    response: User;
    @Output() sendResponse: EventEmitter<User> = new EventEmitter<any>();
    nationalityList: any[] = [];
    filteredNationalities: any[];
    genderList: any[] = GENDER_LIST;
    constructor(
        public matDialogRef: MatDialogRef<UpdateProfileComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        injector: Injector
        ) {
            super(injector);
    }

    ngOnInit(): void {
        this.userForm = new FormGroup({
            id: new FormControl(this.data.user.id),
            firstName: new FormControl(this.data.user.firstName, [Validators.required]),
            middleName: new FormControl(this.data.user.middleName, ),
            lastName: new FormControl(this.data.user.lastName, [Validators.required]),
            contactNo: new FormControl(this.data.user.contactNo, [Validators.required, ValidatorService.numbersOnly]),
            gender: new FormControl(this.data.user.gender, [Validators.required]),
            email: new FormControl({value: this.data.user.email, disabled: true}),
            dateOfBirth: new FormControl(this.data.user.dateOfBirth ? new Date(this.data.user.dateOfBirth) : null, [Validators.required]),
            nationalityId: new FormControl(this.data.user.nationalityId, [Validators.required] ),
        });
        this.nationalityList = this.data.nationalities;
        this.filteredNationalities = this.data.nationalities;
        this.userForm.get('nationalityId').valueChanges.subscribe((value => {
            
            this.filteredNationalities =  this._mapperService.filterData(this.nationalityList, 'nationality', value);
          }));
    }
    displayFn = (id: string): string => {
        return getName(id, 'nationality', cloneDeep(this.nationalityList));
    }
    onSubmit(): void {
        const model = { ...this.userForm.value };
        
        model.dateOfBirth = moment(model.dateOfBirth).format(DATE_FORMAT); 
        this.sendResponse.emit(model);
    }
 
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        // this._dialogRef.closeAll();
    }
    onClose(): void {
        this.sendResponse.emit();
        this.matDialogRef.close(this.response);
    }
}
