import { Component, OnInit, Injector } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "@feature/entitlement/models/user.model";
import {
    NATIONALITY_LIST,
    GENDER_LIST,
    MESSAGES,
} from "@shared/constants/app.constants";
import { AuthenticationService } from "@shared/services/auth/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseConfigService } from "@fuse/services/config.service";
import { BaseComponent } from "@shared/components/base/base.component";
import {
    snakeToCamelObject,
    camelToSnakeCase,
} from "@shared/helpers/global.helper";
import { ValidatorService } from "@shared/services/validator-service/validator.service";
import { fuseAnimations } from "@fuse/animations";
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: "app-invitation",
    templateUrl: "./invitation.component.html",
    styleUrls: ["./invitation.component.scss"],
    animations: fuseAnimations,
})
export class InvitationComponent extends BaseComponent implements OnInit {
    invitationForm: FormGroup;

    response: User;
    nationalityList: any[] = NATIONALITY_LIST;
    genderList: any[] = GENDER_LIST;
    token: string;
    constructor(
        private _authService: AuthenticationService,
        private _fuseConfigService: FuseConfigService,
        private activatedRoute: ActivatedRoute,
        injector: Injector
    ) {
        super(injector);
        this.token = this.activatedRoute.snapshot.paramMap.get("token");

        
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
        this.invitationForm = new FormGroup({
            id: new FormControl(),
            firstName: new FormControl("", [Validators.required]),
            middleName: new FormControl(),
            lastName: new FormControl("", [Validators.required]),
            contactNo: new FormControl("", [
                Validators.required,
                ValidatorService.numbersOnly,
            ]),
            gender: new FormControl("", [Validators.required]),
            status: new FormControl(""),
            email: new FormControl({value:"",disabled: true}),
            dateOfBirth: new FormControl("", [Validators.required]),
            nationalityId: new FormControl("", [Validators.required]),
            password: new FormControl("", Validators.required),
            confirmPassword: new FormControl("", [
                Validators.required,
                this.confirmPasswordValidator.bind(this),
            ]),
        });
        this.getUserByToken(this.token);
    }
    confirmPasswordValidator(control: FormControl): { [s: string]: boolean } {
        if (
            this.invitationForm &&
            control.value !== this.invitationForm.controls.password.value
        ) {
            return { passwordNotMatch: true };
        }
        return null;
    }
    onSubmit() {
        let model = { ...this.invitationForm.value };
        model.dateOfBirth = new Date(model.dateOfBirth).toLocaleDateString();
        model = camelToSnakeCase(model);
        this._authService.updateInvitation(model, this.token).pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                this.errorType = "success";
                this.responseMessage = MESSAGES.UPDATED("Your Profile");
                // setTimeout(() => {
                //     this.router.navigateByUrl('/auth/login');
                // }, 1000);
            },
            (error) => {
                this.errorType = "error";
                this.responseMessage = MESSAGES.UNKNOWN();
            }
        );
    }
    getUserByToken(token) {
        debugger
        this._authService.getUserByToken(token).pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                const user = snakeToCamelObject(response[0]);
                this.invitationForm.patchValue(user);
            },
            (response) => {
                this.errorType = "error";
                if (response.error) {
                    this.errorType = "info";
                    this.responseMessage = MESSAGES.ALREADY_ONBOARD();
                } else {
                    this.responseMessage = MESSAGES.UNKNOWN();
                }
            }
        );
    }
}
