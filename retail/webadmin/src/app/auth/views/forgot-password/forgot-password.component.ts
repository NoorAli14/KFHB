import { AuthenticationService } from "@core/services/auth/authentication.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";

import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import { MESSAGES } from "@shared/constants/app.constants";

@Component({
    selector: "forgot-password",
    templateUrl: "./forgot-password.component.html",
    styleUrls: ["./forgot-password.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ForgotPasswordComponent implements OnInit {
    message: string = "";
    type: string = "";
    forgotPasswordForm: FormGroup;
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
                    this.type = "success";
                    this.message = MESSAGES.PASSWORD_RESET_SENT;
                },
                (error) => {
                    this.type = "error";
                    this.message = MESSAGES.UNKNOWN
                }
            );
    }
}
