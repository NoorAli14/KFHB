import { Component, OnInit, ViewEncapsulation, Injector, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { camelToSnakeCase } from '@shared/helpers/global.helper';
import { BaseComponent } from '@shared/components/base/base.component';
import { REGEX } from '@config/index';

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {
    updatePasswordForm: FormGroup;
    @Input() responseMessage: string;
    @Input() errorType: string;
    @Output() onUpdate: EventEmitter<any> = new EventEmitter();
    constructor(
        injector: Injector
        ) {
            super(injector);
    }

    ngOnInit(): void {
        this.updatePasswordForm = new FormGroup({
            currentPassword: new FormControl('', [Validators.required]),
            newPassword: new FormControl('', [Validators.required, Validators.pattern(REGEX.PASSWORD)]),
            confirmPassword: new FormControl('', [
                Validators.required,
                this.confirmPasswordValidator.bind(this),
            ]),
        });
    }
    confirmPasswordValidator(control: FormControl): { [s: string]: boolean } {
        if (
            this.updatePasswordForm &&
            control.value !== this.updatePasswordForm.controls.newPassword.value
        ) {
            return { passwordNotMatch: true };
        }
        return null;
    }
    onSubmit(): void {
        debugger
        let model = { ...this.updatePasswordForm.value };
        model = camelToSnakeCase(model);
        this.onUpdate.emit(model);
    }
}
