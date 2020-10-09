import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
    ReactiveFormsModule,
    FormsModule,
} from '@angular/forms';
import { Injector } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DOMHelper } from 'testing/dom.helper';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserFormComponent } from './user-form.component';
import { UserService } from '../../services/user.service';
import { User } from '@feature/entitlement/models/user.model';
import { NotifierService } from '@shared/services/notifier/notifier.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('UserFormComponent', async () => {
    let component: UserFormComponent;
    let fixture: ComponentFixture<UserFormComponent>;
    let injectorMock: any;
    let helper: DOMHelper<UserFormComponent>;
    let model;
    let matDialogRefMock: any;
    let notifierServiceMock: any;
    let matSnackBarMock: any;

    beforeEach(async(() => {
        injectorMock = jasmine.createSpyObj('Injector', ['get']);
        matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
        notifierServiceMock = jasmine.createSpyObj('NotifierService', ['success','error']);

        matSnackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);
        TestBed.configureTestingModule({
            declarations: [UserFormComponent],
            imports: [
                RouterTestingModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
                FormsModule,
                MatSelectModule,
                MatInputModule,
            ],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: matDialogRefMock,
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        user: new User(),
                        roles: [],
                    },
                },
                {
                    provide: NotifierService,
                    useValue: notifierServiceMock,
                },
                {
                    provide: MatSnackBar,
                    useValue: matSnackBarMock,
                },
                {
                    provide: Injector,
                    useValue: injectorMock,
                }
               
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        model = {
            id: null,
            name: 'rashid',
            description: '123',
            modules: [],
        };
        fixture = TestBed.createComponent(UserFormComponent);
        component = fixture.componentInstance;
        helper = new DOMHelper(fixture);
        component.ngOnInit();
        fixture.detectChanges();
    });

    describe('User Form General', () => {
        it('should create UserFormComponent', () => {
            expect(component).toBeTruthy();
        });
        it('should genderList array property initialized with more than 1 record', () => {
            expect(component.genderList.length).toBeGreaterThan(1);
        });
        it('should statusList array property initialized with more than 1 record', () => {
            expect(component.statusList.length).toBeGreaterThan(1);
        });
    });

    describe('User Form SUITS', () => {
        beforeEach(() => {
            model = {
                firstName: 'rashid',
                lastName: 'rashid',
                contactNo: '123',
                gender: 'M',
                status: 'rashid',
                email: 'rashid@aiondigital.com',
                dateOfBirth: '12/2/2323',
                nationalityId: 1,
                roles: [{id: 1}]
            };
        });
        it('should User form initialized', () => {
            expect(component.userForm).toBeTruthy();
        });

        it('should the User create button be enable if the form is valid', () => {
            helper.setForm(component.userForm, model);
            fixture.detectChanges();
            const button: HTMLButtonElement = helper.findOne('.submit-button');
            expect(button.disabled).toBe(false);
        });
        it('should User submit button be disable if form is invalid ', () => {
            component.userForm.patchValue({ ...model, firstName: null, contactNo: 'abcd' });
            fixture.detectChanges();
            const button: HTMLButtonElement = helper.findOne('.submit-button');
            expect(button.disabled).toBe(true);
        });
       
        it('should call the onSubmit button only 1 time', () => {
            helper.setForm(component.userForm, model);
            spyOn(component, 'onSubmit');
            helper.clickElement('.submit-button');
            expect(component.onSubmit).toHaveBeenCalledTimes(1);
        });
    });
});
