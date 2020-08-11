import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
} from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import { AuthenticationService } from "@core/services/auth/authentication.service";
import { MESSAGES } from "@shared/constants/app.constants";
import { camelToSnakeCase } from "@shared/helpers/global.helper";

@Component({
    selector: "reset-password",
    templateUrl: "./reset-password.component.html",
    styleUrls: ["./reset-password.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
    resetPasswordForm: FormGroup;
    message: string = "";
    type: string = "";
    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _authService: AuthenticationService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true,
                },
                toolbar: {
                    hidden: true,
                },
                footer: {
                    hidden: true,
                },
                sidepanel: {
                    hidden: true,
                },
            },
        };

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.getEmailTokenStatus();
        this.resetPasswordForm = new FormGroup({
            password: new FormControl("", Validators.required),
            passwordConfirm: new FormControl("", [
                Validators.required,
                this.confirmPasswordValidator.bind(this),
            ]),
        });
    }

    confirmPasswordValidator(control: FormControl): { [s: string]: boolean } {
        if (
            this.resetPasswordForm &&
            control.value !== this.resetPasswordForm.controls.password.value
        ) {
            return { passwordNotMatch: true };
        }
        return null;
    }
    onSubmit() {
        let model = this.resetPasswordForm.value;
        model = camelToSnakeCase(model);
        this._authService.resetPassword(model).subscribe(
            (response) => {
                this.type = "success";
                this.message = MESSAGES.PASSWORD_UPDATED;
            },
            (error) => {
                this.type = "error";
                this.message = MESSAGES.UNKNOWN;
            }
        );
    }
    getEmailTokenStatus() {
        this._authService.getTokenStatus().subscribe(
            (response) => {},
            (error) => {
                this.type = "error";
                this.message = MESSAGES.INVALID_RESET_TOKEN;
            }
        );
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
