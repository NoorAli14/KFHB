import { SettingService } from "./../../setting.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { fuseAnimations } from "@fuse/animations";
import { MESSAGES } from "@shared/constants/app.constants";
import { camelToSnakeCase } from "@shared/helpers/global.helper";

@Component({
    selector: "app-update-password",
    templateUrl: "./update-password.component.html",
    styleUrls: ["./update-password.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class UpdatePasswordComponent implements OnInit {
    updatePasswordForm: FormGroup;
    message: string = "";
    type: string = "";
    constructor(private _settingService: SettingService) {}

    ngOnInit(): void {
        this.updatePasswordForm = new FormGroup({
            currentPassword: new FormControl("", [Validators.required]),
            newPassword: new FormControl("", [Validators.required]),
            confirmPassword: new FormControl("", [
                Validators.required,
                this.passwordMatcher.bind(this),
            ]),
        });
    }
    passwordMatcher(control: FormControl): { [s: string]: boolean } {
        if (
            this.updatePasswordForm &&
            control.value !== this.updatePasswordForm.controls.newPassword.value
        ) {
            return { passwordNotMatch: true };
        }
        return null;
    }
    onSubmit() {
        let model = { ...this.updatePasswordForm.value };
        model = camelToSnakeCase(model);
        this._settingService.updatePassword(model).subscribe(
            (response) => {
                this.type = "success";
                this.message = MESSAGES.UPDATED("Password");
                this.updatePasswordForm.reset();
            },
            (response) => {
                this.type = "error";
                this.message = MESSAGES.UNKNOWN;
            }
        );
    }
}
