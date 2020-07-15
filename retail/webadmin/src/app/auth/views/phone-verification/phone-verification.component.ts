import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FuseConfigService } from "@fuse/services/config.service";

@Component({
    selector: "app-phone-verification",
    templateUrl: "./phone-verification.component.html",
    styleUrls: ["./phone-verification.component.scss"],
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
        this.recoverPasswordForm = this._formBuilder.group({
            code: [
                "",
                [Validators.required, Validators.min(6), Validators.max(6)],
            ],
        });
    }
}
