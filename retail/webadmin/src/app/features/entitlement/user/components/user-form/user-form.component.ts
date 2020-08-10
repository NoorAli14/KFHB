import { ValidatorService } from './../../../../../core/services/validator-service/validator.service';
import { NATIONALITY_LIST, STATUS_LIST, GENDER_LIST } from './../../../../../shared/constants/app.constants';
import { AuthUserService } from "./../../../../../core/services/user/auth-user.service";
import {
    Component,
    OnInit,
    ViewEncapsulation,
    Inject,
    EventEmitter,
    Output,
} from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User } from "@feature/entitlement/models/user.model";
import { UserService } from "@feature/entitlement/user/services/user.service";
import { MESSAGES } from "@shared/constants/app.constants";
import { Role } from "@feature/entitlement/models/role.model";
import { camelToSnakeCase } from "@shared/helpers/global.helper";

@Component({
    selector: "app-user-form",
    templateUrl: "./user-form.component.html",
    styleUrls: ["./user-form.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class UserFormComponent implements OnInit {
    userForm: FormGroup;
    message: string = "";
    type: string = "";
    response: User;
    roles: Role[];
    permissions: any[];
    nationalityList: any[]=NATIONALITY_LIST;
    genderList: any[]=GENDER_LIST;
    statusList: any[]=STATUS_LIST;
    @Output() sendResponse: EventEmitter<User> = new EventEmitter<any>();

    constructor(
        public matDialogRef: MatDialogRef<UserFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _userService: UserService,
        private _authUserService: AuthUserService
    ) {}
    requiredIfUpdating(predicate) {
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
        this.permissions = this._authUserService.getPermissionsByModule("User");
        this.userForm = new FormGroup({
            id: new FormControl(this.data.user.id),
            username: new FormControl(this.data.user.username, [
                this.requiredIfUpdating(() => !this.userForm.get("id").value),
            ]),
            firstName: new FormControl(this.data.user.firstName, [
                this.requiredIfUpdating(() => this.userForm.get("id").value),
            ]),
            middleName: new FormControl(this.data.user.middleName, [
                this.requiredIfUpdating(() => this.userForm.get("id").value),
            ]),
            lastName: new FormControl(this.data.user.lastName, [
                this.requiredIfUpdating(() => this.userForm.get("id").value),
            ]),
            contactNo: new FormControl(this.data.user.contactNo, [
                Validators.required,ValidatorService.numbersOnly
            ]),
            gender: new FormControl(this.data.user.gender, [
                this.requiredIfUpdating(() => this.userForm.get("id").value),
            ]),
            email: new FormControl(this.data.user.email, [
                Validators.required,
                Validators.email,
            ]),
            dateOfBirth: new FormControl(this.data.user.dateOfBirth, [
                this.requiredIfUpdating(() => this.userForm.get("id").value),
            ]),
            nationalityId: new FormControl(this.data.user.nationalityId, [
                this.requiredIfUpdating(() => this.userForm.get("id").value),
            ]),
            roles: new FormControl(this.data.user.roles.map((x) => x.id), [
                Validators.required,
            ]),
            status: new FormControl(this.data.user.status, [
                this.requiredIfUpdating(() => this.userForm.get("id").value),
            ]),
        });
        this.roles = this.data.roles;
    }

    onSubmit() {
        let model = { ...this.userForm.value };
        model.roles = this.userForm.value.roles.map((item) => ({
            id: item,
        }));
        model = camelToSnakeCase(model);
    
        this.sendResponse.emit(model);
    }
}
