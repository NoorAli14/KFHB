import { extractErrorString } from './../../../shared/helpers/global.helper';
import { Component, OnDestroy, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from '@shared/services/auth/authentication.service';
import { camelToSnakeCase } from '@shared/helpers/global.helper';
import { BaseComponent } from '@shared/components/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { MESSAGES } from '@shared/constants/messages.constant';
import { REGEX } from '@config/index';

@Component({
    selector: 'reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {
    resetPasswordForm: FormGroup;
   token: string;
 
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _authService: AuthenticationService,
        private activatedRoute: ActivatedRoute
        ,
        injector: Injector
        ) {
            super(injector);
            this.token = this.activatedRoute.snapshot.paramMap.get('token');
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

        // Set the private defaults
       
    }

    ngOnInit(): void {
        this.getEmailTokenStatus();
        this.resetPasswordForm = new FormGroup({
            password: new FormControl('', [Validators.required, Validators.pattern(REGEX.PASSWORD)]),
            passwordConfirm: new FormControl('', [
                Validators.required,
                this.confirmPasswordValidator.bind(this),
            ]),
        });
    }

    confirmPasswordValidator(control: FormControl): { [s: string]: boolean } {
        if (
            this.resetPasswordForm &&
            control.value !== this.resetPasswordForm.controls.password.value
        ) {
            return { passwordNotMatch: true };
        }
        return null;
    }
    onSubmit = (): void => {
        let model = this.resetPasswordForm.value;
        model = camelToSnakeCase(model);
        this._authService.resetPassword(model, this.token).pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {
                 this.errorType = 'success';
                 this.responseMessage = MESSAGES.PASSWORD_UPDATED;
            },
            (response)=>super.onError(response))
    }
    getEmailTokenStatus = (): void => {
        this._authService.getTokenStatus(this.token).pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response) => {

            },
            (response)=>super.onError(response)
        );
    }
  
}
