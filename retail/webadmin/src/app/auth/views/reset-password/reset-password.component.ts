import { Component, OnDestroy, OnInit, ViewEncapsulation, Injector } from "@angular/core";
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
import { AuthenticationService } from "@shared/services/auth/authentication.service";
import { MESSAGES } from "@shared/constants/app.constants";
import { camelToSnakeCase } from "@shared/helpers/global.helper";
import { BaseComponent } from '@shared/components/base/base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "reset-password",
    templateUrl: "./reset-password.component.html",
    styleUrls: ["./reset-password.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ResetPasswordComponent extends BaseComponent implements OnInit, OnDestroy {
    resetPasswordForm: FormGroup;
   token:string;
    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _authService: AuthenticationService, private activatedRoute: ActivatedRoute
        ,
        injector: Injector
        ) {
            super(injector);
        this.token= this.activatedRoute.snapshot.paramMap.get("token");
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
        this._authService.resetPassword(model,this.token).subscribe(
            (response) => {
                 this.errorType = "success";
                 this.responseMessage = MESSAGES.PASSWORD_UPDATED();
            },
           (response=>super.onError(response))
        );
    }
    getEmailTokenStatus() {
        this._authService.getTokenStatus(this.token).subscribe(
            (response) => {

            },
            (error) => {
                 this.errorType = "error";
                 this.responseMessage = MESSAGES.INVALID_RESET_TOKEN();
            }
        );
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
