import { Component, OnInit, ViewEncapsulation, Input, Inject } from "@angular/core";
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
} from "@angular/forms";
import { Subject } from "rxjs";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User } from '@feature/user/user.model';

@Component({
    selector: "app-user-form",
    templateUrl: "./user-form.component.html",
    styleUrls: ["./user-form.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class UserFormComponent implements OnInit {
    userForm: FormGroup;
    constructor(public matDialogRef: MatDialogRef<UserFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User) {
    }

    ngOnInit(): void {
        this.userForm = new FormGroup({
            userId: new FormControl(this.data.userId, [Validators.required]),
            employeeId: new FormControl(this.data.employeeId, [Validators.required]),
            name: new FormControl(this.data.name, [Validators.required]),
            country: new FormControl(this.data.country, [Validators.required]),
            gender: new FormControl(this.data.gender, [Validators.required]),
            email: new FormControl(this.data.email, [Validators.required, Validators.email]),
            status: new FormControl(this.data.status, [Validators.required]),
        });
    }
    onSubmit() {
        this.matDialogRef.close({data: this.userForm.value});
    }
}
