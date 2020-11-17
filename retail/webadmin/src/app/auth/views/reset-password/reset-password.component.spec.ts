import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '@shared/services/auth/authentication.service';
import { FuseConfigService } from '@fuse/services/config.service';
import {
    ReactiveFormsModule,
    AbstractControl,
    FormGroup,
} from '@angular/forms';
import { Injector } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { DOMHelper } from 'testing/dom.helper';
import { ResetPasswordComponent } from './reset-password.component';
import { NotifierService } from '@shared/services/notifier/notifier.service';

describe('ResetPasswordComponent', async () => {
    let component: ResetPasswordComponent;
    let fixture: ComponentFixture<ResetPasswordComponent>;
    let fuseConfigServiceMock: any;
    let authenticationMock: any;
    let injectorMock: any;
    let helper: DOMHelper<ResetPasswordComponent>;
    let notifierServiceMock: any;
    beforeEach(async(() => {
        fuseConfigServiceMock = jasmine.createSpyObj('FuseConfigService', [
            'config',
        ]);
        notifierServiceMock = jasmine.createSpyObj('NotifierService', ['success', 'error']);

        injectorMock = jasmine.createSpyObj('Injector', ['get']);

        authenticationMock = jasmine.createSpyObj('AuthenticationService', [
            'getTokenStatus',
            'resetPassword',
        ]);
        authenticationMock.getTokenStatus.and.returnValue(of([]));
        authenticationMock.resetPassword.and.returnValue(of([]));
        TestBed.configureTestingModule({
            declarations: [ResetPasswordComponent],
            imports: [
                RouterTestingModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
            ],
            providers: [
                {
                    provide: AuthenticationService,
                    useValue: authenticationMock,
                },
                {
                    provide: NotifierService,
                    useValue: notifierServiceMock,
                },
                {
                    provide: Injector,
                    useValue: injectorMock,
                },
                {
                    provide: FuseConfigService,
                    useValue: fuseConfigServiceMock,
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResetPasswordComponent);
        component = fixture.componentInstance;
        helper = new DOMHelper(fixture);
        component.ngOnInit();
        fixture.detectChanges();
    });

    describe('Reset Password General', () => {
        it('should create reset password component', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('Validate Token SUITS', () => {
        it('should the getEmailTokenStatus called one time ', () => {
            spyOn(component, 'getEmailTokenStatus');
            component.ngOnInit();
            expect(component.getEmailTokenStatus).toHaveBeenCalledTimes(1);
        });
        it('should show the error message if token is invalid ', () => {
            authenticationMock.getTokenStatus.and.returnValue(throwError(''));
            component.ngOnInit();
            expect(component.errorType).toEqual('error');
        });
        it('should show hide the error message if token is valid ', () => {
            authenticationMock.getTokenStatus.and.returnValue(of(''));
            component.ngOnInit();
            expect(component.errorType).toEqual('');
        });
    });

    describe('Forgot Form SUITS', () => {
        it('should reset password form initialized', () => {
            expect(component.resetPasswordForm).toBeTruthy();
        });

        it('should the reset password button be enable if the form is valid', () => {
            helper.setForm(component.resetPasswordForm, {
                password: 'TestUser98$$',
                passwordConfirm: 'TestUser98$$',
            });
            fixture.detectChanges();
            const button: HTMLButtonElement = helper.findOne('.submit-button');
            expect(button.disabled).toBe(false);
        });
        it('should reset password button be disable if form is invalid ', () => {
            component.resetPasswordForm.patchValue({ password: null });
            fixture.detectChanges();
            const button: HTMLButtonElement = helper.findOne('.submit-button');
            expect(button.disabled).toBe(true);
        });

        it('should password and reset password must be same', () => {
            helper.setForm(component.resetPasswordForm, {
                password: 'TestUser98$$',
                passwordConfirm: 'TestUser98$$',
            });
            expect(component.resetPasswordForm.valid).toBeTruthy();
        });

        it('should the form must be invalid if password and reset password does not match', () => {
            helper.setForm(component.resetPasswordForm, {
                password: 'TestUser98$$',
                passwordConfirm: 'test',
            });
            expect(component.resetPasswordForm.invalid).toBeTruthy();
        });
    });

    describe('Reset password Form Submit SUITS', () => {
        it('should call the onSubmit button only 1 time', () => {
            helper.setForm(component.resetPasswordForm, {
                password: 'TestUser98$$',
                passwordConfirm: 'TestUser98$$',
            });
            spyOn(component, 'onSubmit');
            fixture.detectChanges();
            helper.clickElement('.submit-button');
            expect(component.onSubmit).toHaveBeenCalledTimes(1);
        });

        it('should call the authentication service one time ', () => {
            helper.setForm(component.resetPasswordForm, {
                password: 'TestUser98$$',
                passwordConfirm: 'TestUser98$$',
            });
            authenticationMock.resetPassword.and.returnValue(of(''));
            helper.clickElement('.submit-button');
            expect(authenticationMock.resetPassword).toHaveBeenCalledTimes(1);
        });

        it('should show success message if succeed ', () => {
            helper.setForm(component.resetPasswordForm, {
                password: 'TestUser98$$',
                passwordConfirm: 'TestUser98$$',
            });
            authenticationMock.resetPassword.and.returnValue(of(''));
            helper.clickElement('.submit-button');
            fixture.detectChanges();
            expect(component.errorType).toEqual('success');
        });
        it('should show error message if failed ', () => {
            helper.setForm(component.resetPasswordForm, {
                password: 'TestUser98$$',
                passwordConfirm: 'TestUser98$$',
            });
            authenticationMock.resetPassword.and.returnValue(throwError(''));
            helper.clickElement('.submit-button');
            fixture.detectChanges();
            expect(component.errorType).toEqual('error');
        });
    });
});
