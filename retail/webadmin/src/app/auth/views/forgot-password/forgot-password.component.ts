import { extractErrorString } from "./../../../shared/helpers/global.helper";
import { AuthenticationService } from "@shared/services/auth/authentication.service";
import { Component, OnInit, ViewEncapsulation, Injector } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";

import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import { BaseComponent } from "@shared/components/base/base.component";
import { takeUntil } from "rxjs/operators";
import { MESSAGES } from "@shared/constants/messages.constant";

@Component({
    selector: "forgot-password",
    templateUrl: "./forgot-password.component.html",
    styleUrls: ["./forgot-password.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {
    forgotPasswordForm: FormGroup;
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _authService: AuthenticationService,
        injector: Injector
    ) {
        super(injector);
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
    }

    ngOnInit(): void {
        this.forgotPasswordForm = new FormGroup({
            email: new FormControl("", [Validators.required, Validators.email]),
        });
    }
    onSubmit = (): void => {
        this._authService
            .forgotPassword(this.forgotPasswordForm.value)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    this.errorType = "success";
                    this.responseMessage = MESSAGES.PASSWORD_RESET_SENT();
                },
                (response)=>super.onError(response))
    };
}
