import {
    Component,
    OnInit,
    ViewEncapsulation,
    Input,
    Inject,
} from "@angular/core";
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
    AbstractControl,
    ValidationErrors,
} from "@angular/forms";
import { Subject } from "rxjs";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User } from "@feature/user/user.model";

@Component({
    selector: "app-user-form",
    templateUrl: "./user-form.component.html",
    styleUrls: ["./user-form.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class UserFormComponent implements OnInit {
    userForm: FormGroup;
    constructor(
        public matDialogRef: MatDialogRef<UserFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User
    ) {}

    ngOnInit(): void {
        this.userForm = new FormGroup(
            {
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
                gender: new FormControl(this.data.gender, [
                    Validators.required,
                ]),
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
                roleId: new FormControl(this.data.status, [
                    Validators.required,
                ]),
                status: new FormControl(this.data.status, [
                    Validators.required,
                ]),
                password: new FormControl("", [Validators.required]),
                confirmPassword: new FormControl("", [
                    Validators.required, this.passwordMatcher.bind(this)
                  ]),
            }
        );
    }
    passwordMatcher(control: FormControl): { [s: string]: boolean } {
        if (this.userForm &&
          (control.value !== this.userForm.controls.password.value)
        ) {
          return { passwordNotMatch: true };
        }
        return null;
      }
    onSubmit() {
        this.matDialogRef.close({ data: this.userForm.value });
    }
}
