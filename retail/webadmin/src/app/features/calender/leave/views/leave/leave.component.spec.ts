import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { Injector } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { DOMHelper } from 'testing/dom.helper';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '@feature/entitlement/user/components/user-form/user-form.component';
import { CalendarService } from '@feature/calender/services/calendar.service';
import { LeaveComponent } from './leave.component';
import { NotifierService } from '@shared/services/notifier/notifier.service';

describe('LeaveComponent', async () => {
    let component: LeaveComponent;
    let fixture: ComponentFixture<LeaveComponent>;
    let matDialogMock: any;
    let injectorMock: any;
    let calendarServiceMock: any;
    let helper: DOMHelper<LeaveComponent>;
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
    dialogRefSpyObj.componentInstance = { body: '' };
    
    let notifierServiceMock: any;
    beforeEach(async(() => {
        injectorMock = jasmine.createSpyObj('Injector', ['get']);
        matDialogMock = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
        notifierServiceMock = jasmine.createSpyObj('NotifierService', ['success', 'error']);

        calendarServiceMock = jasmine.createSpyObj(
            'CalendarService',
            ['forkLeaveData', 'createWorkingDay', 'editWorkingDay', 'deleteWorkingDay']
        );
        calendarServiceMock.forkLeaveData.and.returnValue(
          of([[], [], []])
      );
        TestBed.configureTestingModule({
              
                declarations: [LeaveComponent,  MockComponent(UserFormComponent)],
            imports: [
                RouterTestingModule,
                NoopAnimationsModule,
            ],
            providers: [
                {
                    provide: CalendarService,
                    useValue: calendarServiceMock,
                },
                {
                    provide: NotifierService,
                    useValue: notifierServiceMock,
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
        fixture = TestBed.createComponent(LeaveComponent);
        component = fixture.componentInstance;
        helper = new DOMHelper(fixture);
        component.ngOnInit();
        fixture.detectChanges();
    });

    describe('Working day Component Data Initialization', () => {
        it('should create Working day view component', () => {
            expect(component).toBeTruthy();
        });
      
        it('should  displayedColumns array property initialized with 4 columns ', () => {
            expect(component.displayedColumns.length).toBe(4);
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
