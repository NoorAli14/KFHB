import { SettingService } from "./../../setting.service";
import { Component, OnInit, ViewEncapsulation, Injector } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { fuseAnimations } from "@fuse/animations";
import { camelToSnakeCase } from "@shared/helpers/global.helper";
import { BaseComponent } from '@shared/components/base/base.component';
import { takeUntil } from 'rxjs/operators';
import { MESSAGES } from '@shared/constants/messages.constant';

@Component({
    selector: "app-update-password",
    templateUrl: "./update-password.component.html",
    styleUrls: ["./update-password.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {
    updatePasswordForm: FormGroup;
    
    constructor(private _settingService: SettingService ,
        injector: Injector
        ) {
            super(injector);
    }

    ngOnInit(): void {
        this.updatePasswordForm = new FormGroup({
            currentPassword: new FormControl("", [Validators.required]),
            newPassword: new FormControl("", [Validators.required]),
            confirmPassword: new FormControl("", [
                Validators.required,
                this.confirmPasswordValidator.bind(this),
            ]),
        });
    }
    confirmPasswordValidator(control: FormControl): { [s: string]: boolean } {
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
        this._settingService.updatePassword(model)  .pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                 this.errorType = "success";
                 this.responseMessage = MESSAGES.UPDATED("Password");
            },
            (response=>super.onError(response))
        );
    }
}
