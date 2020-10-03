import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
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

describe('LoginComponent', async () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let fuseConfigServiceMock: any;
    let authenticationMock: any;
    let injectorMock: any;
    let helper: DOMHelper<LoginComponent>;
    let model: any;
    beforeEach(async(() => {
        fuseConfigServiceMock = jasmine.createSpyObj('FuseConfigService', [
            'config',
        ]);
        injectorMock = jasmine.createSpyObj('Injector', ['get']);

        authenticationMock = jasmine.createSpyObj('AuthenticationService', [
            'login',
        ]);
        model = {
            email: 'test@gmail.com',
            password: 'hello',
        };
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
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
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        helper = new DOMHelper(fixture);
        component.ngOnInit();
        fixture.detectChanges();
    });

    describe('Login General', () => {
        it('should create login component', () => {
            expect(component).toBeTruthy();
        });
        it('should have the login page title ', () => {
            const el = fixture.debugElement.query(By.css('.title'));
            expect(el.nativeElement.textContent).toBe('LOGIN TO YOUR ACCOUNT');
        });
        it('should have 1 buttons on login page ', () => {
            const buttons = fixture.debugElement.queryAll(By.css('button'));
            expect(buttons.length).toBe(1);
        });

        it('should have the login submit button ', () => {
            expect(helper.findOne('.submit-button')).toBeTruthy();
        });
    });

    describe('Login Form SUITS', () => {
        it('should login form initialized', () => {
            expect(component.loginForm).toBeTruthy();
        });

        it('should the login button be enable if the form is valid', () => {
            helper.setForm(component.loginForm, model);
            fixture.detectChanges();
            const button: HTMLButtonElement = helper.findOne('.submit-button');
            expect(button.disabled).toBe(false);
        });

        it('should login button be disable if form is invalid ', () => {
            component.loginForm.patchValue({ email: null, password: null });
            fixture.detectChanges();
            const button: HTMLButtonElement = helper.findOne('.submit-button');
            expect(button.disabled).toBe(true);
        });

        it('should login form has email and password fields ', () => {
            expect(component.loginForm.get('email')).toBeTruthy();
            expect(component.loginForm.get('password')).toBeTruthy();
        });

        it('should email and password be required ', () => {
            expect(
                component.loginForm
                    .get('email')
                    .validator({} as AbstractControl)
            ).toBeTruthy();
            expect(
                component.loginForm
                    .get('password')
                    .validator({} as AbstractControl)
            ).toBeTruthy();
        });

        it('should email accept valid email ', () => {
            helper.setForm(component.loginForm, { email: 'abc' });
            expect(component.loginForm.get('email').errors.email).toBeTruthy();
            helper.setForm(component.loginForm, { email: 'test@gmail.com' });
            expect(component.loginForm.get('email').errors).toBeNull();
        });
    });

    describe('Login Form Submit SUITS', () => {
        it('should call the onSubmit button only 1 time', () => {
            helper.setForm(component.loginForm, model);
            spyOn(component, 'onSubmit');
            fixture.detectChanges();
            helper.clickElement('.submit-button');
            expect(component.onSubmit).toHaveBeenCalledTimes(1);
        });

        it('should call the authentication service one time ', () => {
            helper.setForm(component.loginForm, model);
            fixture.detectChanges();
            helper.clickElement('.submit-button');
            expect(authenticationMock.login).toHaveBeenCalledTimes(1);
        });

        it('should show the success message on successful login', async () => {
            helper.setForm(component.loginForm, model);
            authenticationMock.login.and.returnValue(of([]));
            helper.clickElement('.submit-button');
            expect(component.errorType).toEqual('success');
        });

        it('should show the error message on login failed', async () => {
            helper.setForm(component.loginForm, model);
            authenticationMock.login.and.returnValue(throwError(''));
            helper.clickElement('.submit-button');
            expect(component.errorType).toEqual('error');
        });
    });
});
