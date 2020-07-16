import { Component, OnInit, ViewEncapsulation, Inject } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User } from "@feature/user/user.model";
import { UserService } from "@feature/user/services/user.service";
import { MESSAGES } from "@shared/constants/app.constants";

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
    constructor(
        public matDialogRef: MatDialogRef<UserFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User,
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
            id: new FormControl(this.data.id),
            username: new FormControl(this.data.username, [
                this.requiredIfUpdating(() => !this.userForm.get("id").value),
            ]),
            firstName: new FormControl(this.data.firstName, [
                this.requiredIfUpdating(() => this.userForm.get("id").value),
            ]),
            middleName: new FormControl(this.data.middleName, [
                this.requiredIfUpdating(() => this.userForm.get("id").value),
            ]),
            lastName: new FormControl(this.data.lastName, [
                this.requiredIfUpdating(() => this.userForm.get("id").value),
            ]),
            contactNo: new FormControl(this.data.contactNo, [
                Validators.required,
            ]),
            gender: new FormControl(this.data.gender, [
                this.requiredIfUpdating(() => this.userForm.get("id").value),
            ]),
            email: new FormControl(this.data.email, [
                Validators.required,
                Validators.email,
            ]),
            dateOfBirth: new FormControl(this.data.dateOfBirth, [
                this.requiredIfUpdating(() => this.userForm.get("id").value),
            ]),
            nationalityId: new FormControl(this.data.nationalityId, [
                this.requiredIfUpdating(() => this.userForm.get("id").value),
            ]),
            roleId: new FormControl(this.data.status, [Validators.required]),
            status: new FormControl(this.data.status, [
                this.requiredIfUpdating(() => this.userForm.get("id").value),
            ]),
        });
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
