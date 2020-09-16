import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewEncapsulation, Injector } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";

import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";
import { AuthenticationService } from "@shared/services/auth/authentication.service";
import { MESSAGES } from "@shared/constants/app.constants";
import { BaseComponent } from "@shared/components/base/base.component";
import { takeUntil } from 'rxjs/operators';

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
        injector: Injector
    ) {
        super(injector);
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
            email: new FormControl("", [Validators.required, Validators.email]),
            password: new FormControl("", [Validators.required]),
        });
    }
    onSubmit() {
        const model = this.loginForm.value;
        this._authService.login(model).pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                this.errorType = "success";
                this.responseMessage = MESSAGES.LOGGED_IN();
                setTimeout(() => {
                    this.router.navigateByUrl(
                        this.returnUrl ? this.returnUrl : "/ent/user"
                    );
                }, 1000);
            },
            (response) => {
                this.errorType = "error";
                if (response.statusCode === 401) {
                    this.responseMessage = MESSAGES.INVALID_CREDENTIAL();
                } else {
                    this.responseMessage = MESSAGES.UNKNOWN();
                }
            }
        );
    }
}
