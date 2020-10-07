import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '@shared/services/auth/authentication.service';
import { FuseConfigService } from '@fuse/services/config.service';
import {
    ReactiveFormsModule,
    AbstractControl,
    FormGroup,
    FormsModule,
} from '@angular/forms';
import {
    Injector,
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { DOMHelper } from 'testing/dom.helper';
import { InvitationComponent } from './invitation.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('InvitationComponent', async () => {
    let component: InvitationComponent;
    let fixture: ComponentFixture<InvitationComponent>;
    let fuseConfigServiceMock: any;
    let authenticationMock: any;
    let injectorMock: any;
    let helper: DOMHelper<InvitationComponent>;
    let model;
    beforeEach(async(() => {
           
        fuseConfigServiceMock = jasmine.createSpyObj('FuseConfigService', [
            'config',
        ]);
        injectorMock = jasmine.createSpyObj('Injector', ['get']);

        authenticationMock = jasmine.createSpyObj('AuthenticationService', [
            'getUserByToken',
            'updateInvitation',
        ]);
      
        authenticationMock.getUserByToken.and.returnValue(of([[], []]));
        authenticationMock.updateInvitation.and.returnValue(of([]));
        TestBed.configureTestingModule({
            declarations: [InvitationComponent],
            imports: [
                RouterTestingModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
                FormsModule,
                MatSelectModule,
                MatInputModule,
                MatAutocompleteModule
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
        model = {
            id: '123',
            firstName: 'rashid',
            middleName: 'test',
            lastName: 'rashid',
            contactNo: '123',
            gender: 'M',
            email: 'rashid@aiondigital.com',
            dateOfBirth: '12/2/2323',
            nationalityId: 1,
            password: 'TestUser98$$',
            confirmPassword: 'TestUser98$$',
        };
        fixture = TestBed.createComponent(InvitationComponent);
        component = fixture.componentInstance;
        helper = new DOMHelper(fixture);
        component.ngOnInit();
        fixture.detectChanges();
    });

   

    describe('Validate Token SUITS', () => {
        it('should the getUserByToken called one time ', () => {
            spyOn(component, 'getUserByToken');
            component.ngOnInit();
            fixture.detectChanges();
            expect(component.getUserByToken).toHaveBeenCalledTimes(1);
        });

        it('should show the error message on failed', () => {
            authenticationMock.getUserByToken.and.returnValue(
                throwError({ error: 'error' })
            );
            component.ngOnInit();
            fixture.detectChanges();
            expect(component.errorType).toEqual('error');
        });

        it('should show the error message if token is invalid ', () => {
            authenticationMock.getUserByToken.and.returnValue(throwError({}));
            component.ngOnInit();
            expect(component.errorType).toEqual('error');
        });

        it('should show hide the error message if token is valid ', () => {
            authenticationMock.getUserByToken.and.returnValue(
                of({ email: 'rashid@gmail.com' })
            );
            component.ngOnInit();
            expect(component.errorType).toEqual('');
        });
    });

    describe('Invitation Form SUITS', () => {
        it('should invitation form initialized', () => {
            component.ngOnInit();
            fixture.detectChanges();
            expect(component.invitationForm).toBeTruthy();
        });

        it('should the invitation button be enable if the form is valid', () => {
            component.ngOnInit();
            helper.setForm(component.invitationForm, model);
            fixture.detectChanges();
            const button: HTMLButtonElement = helper.findOne('.post-button');
            expect(button.disabled).toBe(false);
        });

        it('should invitation submit button be disable if form is invalid ', () => {
            component.ngOnInit();
            component.invitationForm.patchValue({ ...model, contactNo: null });
            fixture.detectChanges();
            const button: HTMLButtonElement = helper.findOne('.post-button');
            expect(button.disabled).toBe(true);
        });

        it('should invitation submit button be disable if password and confirm password not matched ', () => {
            component.invitationForm.patchValue({
                ...model,
                password: 'hello',
                confirmPassword: 'hello1',
            });
            fixture.detectChanges();
            const button: HTMLButtonElement = helper.findOne('.post-button');
            expect(button.disabled).toBe(true);
        });
    });

    describe('Invitation Form Submit SUITS', () => {
        it('should call the onSubmit button only 1 time', () => {
            helper.setForm(component.invitationForm, model);
            spyOn(component, 'onSubmit');
            helper.clickElement('.post-button');
            expect(component.onSubmit).toHaveBeenCalledTimes(1);
        });

        it('should call the authentication service one time ', () => {
            helper.setForm(component.invitationForm, model);
            helper.clickElement('.post-button');
            expect(authenticationMock.updateInvitation).toHaveBeenCalledTimes(1);
        });

        it('should show success message if succeed', () => {
            helper.setForm(component.invitationForm, model);
            helper.clickElement('.post-button');
            expect(component.errorType).toEqual('success');
        });
        it('should show error message if failed', () => {
            helper.setForm(component.invitationForm, model);
            authenticationMock.updateInvitation.and.returnValue(throwError(''));
            helper.clickElement('.post-button');
            expect(component.errorType).toEqual('error');
        });
    });
});
