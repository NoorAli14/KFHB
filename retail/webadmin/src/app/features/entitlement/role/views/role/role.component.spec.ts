import { RoleFormComponent } from './../../components/role-form/role-form.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
    ReactiveFormsModule,
} from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { Injector } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of,  } from 'rxjs';
import { DOMHelper } from 'testing/dom.helper';
import { RoleComponent } from './role.component';
import { RoleService } from '../../services/role.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from '@shared/services/notifier/notifier.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('RoleComponent', async () => {
    let component: RoleComponent;
    let fixture: ComponentFixture<RoleComponent>;
    let roleServiceMock: any;
    let matDialogMock: any;
    let injectorMock: any;
    let helper: DOMHelper<RoleComponent>;
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
    let notifierServiceMock: any;
    dialogRefSpyObj.componentInstance = { body: '' };
    let matSnackBarMock: any;

    beforeEach(async(() => {
        injectorMock = jasmine.createSpyObj('Injector', ['get']);
        matDialogMock = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
        notifierServiceMock = jasmine.createSpyObj('NotifierService', ['success','error']);
        matSnackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);
        roleServiceMock = jasmine.createSpyObj(
            'RoleService',
            ['forkRolesData', 'createRole', 'editRole', 'deleteRole']
        );
        roleServiceMock.forkRolesData.and.returnValue(
            of([[], [], []])
        );
        TestBed.configureTestingModule({
              
                declarations: [RoleComponent,  MockComponent(RoleFormComponent)],
            imports: [
                RouterTestingModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
            ],
            providers: [
                {
                    provide: RoleService,
                    useValue: roleServiceMock,
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
                    provide: MatDialog,
                    useValue: matDialogMock,
                },
                {
                    provide: Injector,
                    useValue: injectorMock,
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoleComponent);
        component = fixture.componentInstance;
        helper = new DOMHelper(fixture);
        component.ngOnInit();
        fixture.detectChanges();
    });

    describe('Roles Component Data Initialization', () => {
        it('should create Roles view component', () => {
            expect(component).toBeTruthy();
        });
        it('should roles array property initialized with empty array ', () => {
            expect(component.roles.length).toBe(0);
        });
        it('should modules array property initialized with empty array', () => {
            expect(component.modules.length).toBe(0);
        });
        it('should permissions array property initialized with empty array', () => {
            expect(component.permissions.length).toBe(0);
        });
        it('should  displayedColumns array property initialized with 5 columns ', () => {
            expect(component.displayedColumns.length).toBe(5);
        });
      
        it('should call openDialog method on create new role button click only 1 time', () => {
            spyOn(component, 'openDialog');
            helper.clickElement('.add-product-button');
            expect(component.openDialog).toHaveBeenCalledTimes(1);
        });
        it('should open dialog on create role button click', () => {
            helper.clickElement('.add-product-button');
            matDialogMock.open.and.returnValue(dialogRefSpyObj);
            expect(matDialogMock.open).toHaveBeenCalledTimes(1);
        });
       
    });
});
