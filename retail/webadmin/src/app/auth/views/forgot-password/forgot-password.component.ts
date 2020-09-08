import { AuthenticationService } from "@shared/services/auth/authentication.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";

import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import { MESSAGES } from "@shared/constants/app.constants";
import { BaseComponent } from '@shared/components/base/base.component';

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
        private _authService: AuthenticationService
    ) {
        super()
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
    onSubmit() {
        this._authService
            .forgotPassword(this.forgotPasswordForm.value)
            .subscribe(
                (response) => {
                     this.errorType = "success";
                     this.responseMessage = MESSAGES.PASSWORD_RESET_SENT();
                },
               (response=>super.onError(response))
            );
    }
}
