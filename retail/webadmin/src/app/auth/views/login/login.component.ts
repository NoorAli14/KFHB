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

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    message: string = "";
    type: string = "";
    returnUrl: string;
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _authService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router
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
        this.returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
        this.loginForm = new FormGroup({
            email: new FormControl("r@g.com", [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl("Abcd@123", [Validators.required]),
        });
    }
    onSubmit() {
        this._authService.login(this.loginForm.value).subscribe(
            (response) => {
                this.type = "success";
                this.message = MESSAGES.LOGGED_IN;
                setTimeout(() => {
                    this.router.navigateByUrl(
                        this.returnUrl ? this.returnUrl : '"/ent/user"'
                    );
                }, 2000);
            },
            (error) => {
                this.type = "error";
                this.message = MESSAGES.INVALID_CREDENTIAL;
            }
        );
    }
}
