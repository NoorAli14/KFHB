import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { Injector } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of,  } from 'rxjs';
import { DOMHelper } from 'testing/dom.helper';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UserComponent } from './user.component';
import { UserService } from '../../services/user.service';
import { NotifierService } from '@shared/services/notifier/notifier.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('UserComponent', async () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;
    let matDialogMock: any;
    let injectorMock: any;
    let userServiceMock: any;
    let helper: DOMHelper<UserComponent>;
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
    dialogRefSpyObj.componentInstance = { body: '' };
    let notifierServiceMock: any;
    let matSnackBarMock: any;

    beforeEach(async(() => {
        injectorMock = jasmine.createSpyObj('Injector', ['get']);
        userServiceMock = jasmine.createSpyObj('UserService', ['get']);
        matDialogMock = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
        notifierServiceMock = jasmine.createSpyObj('NotifierService', ['success', 'error']);

        matSnackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);
       
        userServiceMock = jasmine.createSpyObj(
            'UserService',
            ['forkUserData', 'createUser', 'editUser', 'deleteUser']
        );
        userServiceMock.forkUserData.and.returnValue(
            of([[], []])
        );
        TestBed.configureTestingModule({
              
                declarations: [UserComponent,  MockComponent(UserFormComponent)],
            imports: [
                RouterTestingModule,
                NoopAnimationsModule,
            ],
            providers: [
                {
                    provide: UserService,
                    useValue: userServiceMock,
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
        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
        helper = new DOMHelper(fixture);
        component.ngOnInit();
        fixture.detectChanges();
    });

    describe('User Component Data Initialization', () => {
        it('should create User view component', () => {
            expect(component).toBeTruthy();
        });
      
        it('should users array property initialized with empty array', () => {
            expect(component.users.length).toBe(0);
        });
        it('should roles array property initialized with empty array', () => {
            expect(component.roles.length).toBe(0);
        });
        it('should  displayedColumns array property initialized with 6 columns ', () => {
            expect(component.displayedColumns.length).toBe(6);
        });

       
        it('should call openDialog method on create new user button click only 1 time', () => {
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
