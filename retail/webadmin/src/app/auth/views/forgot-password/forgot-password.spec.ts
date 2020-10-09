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
import { of } from 'rxjs';
import { DOMHelper } from 'testing/dom.helper';
import { ForgotPasswordComponent } from './forgot-password.component';
import { NotifierService } from '@shared/services/notifier/notifier.service';

describe('ForgotPasswordComponent', async () => {
    let component: ForgotPasswordComponent;
    let fixture: ComponentFixture<ForgotPasswordComponent>;
    let fuseConfigServiceMock: any;
    let authenticationMock: any;
    let injectorMock: any;
    let helper: DOMHelper<ForgotPasswordComponent>;
    let notifierServiceMock: any;
    beforeEach(async(() => {
        fuseConfigServiceMock = jasmine.createSpyObj('FuseConfigService', [
            'config',
        ]);
        notifierServiceMock = jasmine.createSpyObj('NotifierService', ['success', 'error']);
        injectorMock = jasmine.createSpyObj('Injector', ['get']);

        authenticationMock = jasmine.createSpyObj('AuthenticationService', [
            'forgotPassword',
        ]);
        TestBed.configureTestingModule({
            declarations: [ForgotPasswordComponent],
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
        fixture = TestBed.createComponent(ForgotPasswordComponent);
        component = fixture.componentInstance;
        helper = new DOMHelper(fixture);
        component.ngOnInit();
        fixture.detectChanges();
    });

    describe('Forgot Form SUITS', () => {
        it('should forgot password form initialized', () => {
            expect(component.forgotPasswordForm).toBeTruthy();
        });

        it('should create forgot password component', () => {
            expect(component).toBeTruthy();
        });
        it('should the forgot password button be enable if the form is valid', () => {
            helper.setForm(component.forgotPasswordForm, {
                email: 'test@gmail.com',
            });
            fixture.detectChanges();
            const button: HTMLButtonElement = helper.findOne('.submit-button');
            expect(button.disabled).toBe(false);
        });
        it('should forgot password button be disable if form is invalid ', () => {
            component.forgotPasswordForm.patchValue({ email: null });
            fixture.detectChanges();
            const button: HTMLButtonElement = helper.findOne('.submit-button');
            expect(button.disabled).toBe(true);
        });

        it('should email accept valid email ', () => {
            helper.setForm(component.forgotPasswordForm, { email: 'abc' });
            expect(
                component.forgotPasswordForm.get('email').errors.email
            ).toBeTruthy();
            helper.setForm(component.forgotPasswordForm, {
                email: 'test@gmail.com',
            });
            expect(component.forgotPasswordForm.get('email').errors).toBeNull();
        });
        it('should forgot password form has email fields ', () => {
            expect(component.forgotPasswordForm.get('email')).toBeTruthy();
        });

        it('should email and password be required ', () => {
            expect(
                component.forgotPasswordForm
                    .get('email')
                    .validator({} as AbstractControl)
            ).toBeTruthy();
        });
    });

    describe('Forgot Form Page SUITS', () => {
        it('should have the forgot password page title ', () => {
            const el = fixture.debugElement.query(By.css('.title'));
            expect(el.nativeElement.textContent).toBe('RECOVER YOUR PASSWORD');
        });
        it('should have the submit button ', () => {
            expect(helper.findOne('.submit-button')).toBeTruthy();
        });
    });
    
    describe('Forgot Form Events SUITS', () => {
        it('should call the onSubmit button only 1 time', () => {
            helper.setForm(component.forgotPasswordForm, {
                email: 'test@gmail.com',
            });
            spyOn(component, 'onSubmit');
            fixture.detectChanges();
            helper.clickElement('.submit-button');
            expect(component.onSubmit).toHaveBeenCalledTimes(1);
        });

        it('should call the authentication service one time ', () => {
            helper.setForm(component.forgotPasswordForm, {
                email: 'test@gmail.com',
                password: 'hello',
            });

            fixture.detectChanges();
            helper.clickElement('.submit-button');
            expect(authenticationMock.forgotPassword).toHaveBeenCalledTimes(1);
        });
    });
});
