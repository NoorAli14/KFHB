import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
} from "@angular/forms";
import { FuseConfigService } from "@fuse/services/config.service";
import { fuseAnimations } from "@fuse/animations";

@Component({
    selector: "app-phone-verification",
    templateUrl: "./phone-verification.component.html",
    styleUrls: ["./phone-verification.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class PhoneVerificationComponent implements OnInit {
    recoverPasswordForm: FormGroup;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder
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
        this.recoverPasswordForm = new FormGroup({
            code: new FormControl("", [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(6),
            ]),
            password: new FormControl("", [Validators.required]),
            confirmPassword: new FormControl("", [
                Validators.required,
                this.passwordMatcher.bind(this),
            ]),
        });
    }
    passwordMatcher(control: FormControl): { [s: string]: boolean } {
        if (
            this.recoverPasswordForm &&
            control.value !== this.recoverPasswordForm.controls.password.value
        ) {
            return { passwordNotMatch: true };
        }
        return null;
    }
    onSubmit() {
        console.log(this.recoverPasswordForm)
    }
}
