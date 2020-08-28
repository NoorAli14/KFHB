import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
} from "@angular/forms";

import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import { AuthenticationService } from "@core/services/auth/authentication.service";
import { MESSAGES } from "@shared/constants/app.constants";
import { BaseComponent } from "@shared/components/base/base.component";
import { CookieService } from "ngx-cookie-service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class LoginComponent extends BaseComponent implements OnInit {
    loginForm: FormGroup;

    returnUrl: string;
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _authService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private cookie: CookieService
    ) {
        super();
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
        this.returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
        this.loginForm = new FormGroup({
            email: new FormControl("r@g.com", [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl("Abcd@123", [Validators.required]),
            rememberMe: new FormControl(""),
        });

        const email = this.cookie.get("email");
        const password = this.cookie.get("password");
        if (email) {
            this.loginForm.patchValue({ email });
            this.loginForm.patchValue({ password });
        }
    }
    onSubmit() {
        const model = this.loginForm.value;
        this._authService.login(model).subscribe(
            (response) => {
                this.errorType = "success";
                this.responseMessage = MESSAGES.LOGGED_IN;
                if (model.rememberMe) {
                    this.cookie.set("email", model.email);
                    this.cookie.set("password", model.password);
                } else {
                    this.cookie.delete("email", model.email);
                    this.cookie.delete("password", model.password);
                }
                setTimeout(() => {
                    this.router.navigateByUrl(
                        this.returnUrl ? this.returnUrl : "/ent/user"
                    );
                }, 1000);
            },
            (error) => {
                this.errorType = "error";
                this.responseMessage = MESSAGES.UNKNOWN;
            }
        );
    }
}
