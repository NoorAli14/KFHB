import {
    STATUS_LIST,
    GENDER_LIST,
    MODULES,
} from '@shared/constants/app.constants';
import {
    Component,
    OnInit,
    ViewEncapsulation,
    Inject,
    EventEmitter,
    Output,
    Injector, OnDestroy
} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@feature/entitlement/models/user.model';
import { Role } from '@feature/entitlement/models/role.model';
import { camelToSnakeCase } from '@shared/helpers/global.helper';
import { BaseComponent } from '@shared/components/base/base.component';
import { fuseAnimations } from '@fuse/animations';
import { ValidatorService } from '@shared/services/validator-service/validator.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class UserFormComponent extends BaseComponent implements OnDestroy, OnInit {
    userForm: FormGroup;
    response: User;
    roles: Role[];
    permissions: any[];
    nationalityList: any[] = [];
    genderList: any[] = GENDER_LIST;
    statusList: any[] = STATUS_LIST;
    @Output() sendResponse: EventEmitter<User> = new EventEmitter<any>();
  
    constructor(
        public matDialogRef: MatDialogRef<UserFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        injector: Injector
    ) {
        super(injector, MODULES.USER_MANAGEMENT);
        super.ngOnInit();
    }
    requiredIfUpdating(predicate): any {
        return (formControl) => {
            if (!formControl.parent) {
                return null;
            }
            if (predicate()) {
                return Validators.required(formControl);
            }
            return null;
        };
    }
    ngOnInit(): void {
        this._unsubscribeAll = new Subject();
        this._errorEmitService.currentMessage
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((item) => {
                this.errorType = item.type;
                this.responseMessage = item.message;
            });
        this.userForm = new FormGroup({
            id: new FormControl(this.data.user.id),
            username: new FormControl(this.data.user.username, [
                this.requiredIfUpdating(() => !this.userForm.get('id').value),
            ]),
            firstName: new FormControl(this.data.user.firstName, [
                this.requiredIfUpdating(() => this.userForm.get('id').value),
            ]),
            middleName: new FormControl(this.data.user.middleName),
            lastName: new FormControl(this.data.user.lastName, [
                this.requiredIfUpdating(() => this.userForm.get('id').value),
            ]),
            contactNo: new FormControl(
                {
                    value: this.data.user.contactNo,
                    disabled: this.data.user.id ? true : false,
                },
                [ValidatorService.numbersOnly]
            ),
            gender: new FormControl(this.data.user.gender, [
                this.requiredIfUpdating(() => this.userForm.get('id').value),
            ]),
            email: new FormControl(
                {
                    value: this.data.user.email,
                    disabled: this.data.user.id ? true : false,
                },
                [Validators.required, Validators.email]
            ),
            dateOfBirth: new FormControl({
                value: this.data.user.dateOfBirth
                    ? new Date(this.data.user.dateOfBirth)
                    : null,
                disabled: this.data.user.id ? true : false,
            }),
            nationalityId: new FormControl({
                value: this.data.user.nationalityId,
                disabled: this.data.user.id ? true : false,
            }),
            roles: new FormControl(
                this.data.user.roles.map((x) => x.id),
                [Validators.required]
            ),
        });
        this.roles = this.data.roles;
        this.nationalityList = this.data.nationalities;
    }
   
    isExist(roles, roleId): Role {
        return roles.find((x) => x === roleId);
    }
    onSubmit(): void {
        let model = { ...this.userForm.value };
        model.roles = this.userForm.value.roles.map((item) => ({
            id: item,
        }));
        if (model.id && model.id.length > 0) {
            this.data.user.roles.forEach((item) => {
                const isExist = this.isExist(model.roles, item.id);
                if (!isExist) { model.roles.push({ id: item.id, _deleted: true }); }
            });
        }
        model = camelToSnakeCase(model);

        this.sendResponse.emit(model);
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        // this._dialogRef.closeAll();
    }
    onClose(): void{
        this.sendResponse.emit();
        this.matDialogRef.close();
    }
}
