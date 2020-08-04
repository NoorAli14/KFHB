import { Router } from "@angular/router";
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

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _authService: AuthenticationService,
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
        this.loginForm = new FormGroup({
            email: new FormControl("r@g.com", [Validators.required, Validators.email]),
            password: new FormControl("123", [Validators.required]),
        });
    }
    onSubmit() {
        this._authService.login(this.loginForm.value).subscribe(
            (response) => {
                this.router.navigateByUrl("/ent/user");
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
