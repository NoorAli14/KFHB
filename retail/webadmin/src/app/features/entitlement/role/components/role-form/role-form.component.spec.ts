import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '@shared/services/auth/authentication.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { ReactiveFormsModule, FormsModule, AbstractControl } from '@angular/forms';
import { Injector } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of,  } from 'rxjs';
import { DOMHelper } from 'testing/dom.helper';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { RoleFormComponent } from './role-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from '@feature/entitlement/models/role.model';
import { RoleService } from '../../services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierService } from '@shared/services/notifier/notifier.service';

describe('RoleFormComponent', async () => {
    let component: RoleFormComponent;
    let fixture: ComponentFixture<RoleFormComponent>;
    let roleServiceMock: any;
    let injectorMock: any;
    let helper: DOMHelper<RoleFormComponent>;
    let model;
    let matDialogRefMock: any;
    let matSnackBarMock: any;
    let notifierServiceMock: any;
    beforeEach(async(() => {
        injectorMock = jasmine.createSpyObj('Injector', ['get']);
        matSnackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);
        matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
        notifierServiceMock = jasmine.createSpyObj('NotifierService', ['success', 'error']);
        roleServiceMock = jasmine.createSpyObj('RoleService', [
            'getSelectedPermissions',
        ]);
        roleServiceMock.getSelectedPermissions.and.returnValue(of([]));
        TestBed.configureTestingModule({
            declarations: [RoleFormComponent],
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
                        permissions: [],
                        role: new Role(),
                        modules: [],
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
                },
                {
                    provide: RoleService,
                    useValue: roleServiceMock,
                },
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
        fixture = TestBed.createComponent(RoleFormComponent);
        component = fixture.componentInstance;
        helper = new DOMHelper(fixture);
        component.ngOnInit();
        fixture.detectChanges();
    });

    describe('Role Form General', () => {
        it('should create RoleFormComponent', () => {
            expect(component).toBeTruthy();
        });
        it('should modulesMapped array property initialized with empty array', () => {
            expect(component.modulesMapped.length).toBe(0);
        });
        it('should  displayedColumns array property initialized with 1 columns ', () => {
            expect(component.displayedColumns.length).toBe(1);
        });
        it('should camelToSentenceCase be called', () => {
            spyOn(component, 'camelToSentenceCase');
            component.camelToSentenceCase('helloWorld');
            expect(component.camelToSentenceCase).toHaveBeenCalled();
        });
    });

    describe('Role Form SUITS', () => {
        it('should Role form initialized', () => {
            expect(component.roleForm).toBeTruthy();
        });

        it('should the Role create button be enable if the form is valid', () => {
            helper.setForm(component.roleForm, model);
            fixture.detectChanges();
            const button: HTMLButtonElement = helper.findOne('.submit-button');
            expect(button.disabled).toBe(false);
        });
        it('should Role submit button be disable if form is invalid ', () => {
            component.roleForm.patchValue({ ...model, name: null });
            fixture.detectChanges();
            const button: HTMLButtonElement = helper.findOne('.submit-button');
            expect(button.disabled).toBe(true);
        });
        it('should name and description field be required ', () => {
            expect(component.roleForm.get('name').validator({} as AbstractControl) ).toBeTruthy();
            expect(component.roleForm.get('description').validator({} as AbstractControl) ).toBeTruthy();
        });
       
    });
});
