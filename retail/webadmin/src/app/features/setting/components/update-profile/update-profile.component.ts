import { Component, OnInit, ViewEncapsulation, Inject } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MESSAGES } from "@shared/constants/app.constants";
import { fuseAnimations } from '@fuse/animations';
import { User } from '@feature/entitlement/models/user.model';
import { UserService } from '@feature/entitlement/user/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
   encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class UpdateProfileComponent implements OnInit {

  userForm: FormGroup;
    message: string = "";
    type: string = "";
    response: User;
    constructor(
        public matDialogRef: MatDialogRef<UpdateProfileComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User,
        private _userService: UserService
    ) {}

    ngOnInit(): void {
        this.userForm = new FormGroup({
            id: new FormControl(this.data.id),
            username: new FormControl(this.data.username, [
                Validators.required,
            ]),
            firstName: new FormControl(this.data.firstName, [
                Validators.required,
            ]),
            middleName: new FormControl(this.data.middleName, [
                Validators.required,
            ]),
            lastName: new FormControl(this.data.lastName, [
                Validators.required,
            ]),
            contactNo: new FormControl(this.data.contactNo, [
                Validators.required,
            ]),
            gender: new FormControl(this.data.gender, [Validators.required]),
            email: new FormControl(this.data.email, [
                Validators.required,
                Validators.email,
            ]),
            dateOfBirth: new FormControl(this.data.dateOfBirth, [
                Validators.required,
            ]),
            nationalityId: new FormControl(this.data.nationalityId, [
                Validators.required,
            ]),
            roleId: new FormControl(this.data.status, [Validators.required]),
            status: new FormControl(this.data.status, [Validators.required]),
            password: new FormControl("", [Validators.required]),
            confirmPassword: new FormControl("", [
                Validators.required,
                this.passwordMatcher.bind(this),
            ]),
        });
    }
    passwordMatcher(control: FormControl): { [s: string]: boolean } {
        if (
            this.userForm &&
            control.value !== this.userForm.controls.password.value
        ) {
            return { passwordNotMatch: true };
        }
        return null;
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
