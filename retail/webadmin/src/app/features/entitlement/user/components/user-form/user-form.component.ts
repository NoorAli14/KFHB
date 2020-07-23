import { Component, OnInit, ViewEncapsulation, Inject } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User } from "@feature/entitlement/models/user.model";
import { UserService } from "@feature/entitlement/user/services/user.service";
import { MESSAGES } from "@shared/constants/app.constants";
import { Role } from '@feature/entitlement/models/role.model';

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
    constructor(
        public matDialogRef: MatDialogRef<UserFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _userService: UserService
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
                Validators.required,
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
            roleId: new FormControl(this.data.user.status, [Validators.required]),
            status: new FormControl(this.data.user.status, [
                this.requiredIfUpdating(() => this.userForm.get("id").value),
            ]),
        });
        this.roles= this.data.roles;
    }

    onSubmit() {
        this.userForm.value.id = Math.random().toString();
        this._userService.createUser(this.userForm.value).subscribe(
            (response: User) => {
                this.response = response;
                this.type = "success";
                this.message = MESSAGES.CREATED("User");
            },
            () => {
                this.type = "error";
                this.message = MESSAGES.UNKNOWN;
            }
        );
    }
    onClose() {
        this.matDialogRef.close(this.response);
    }
}
