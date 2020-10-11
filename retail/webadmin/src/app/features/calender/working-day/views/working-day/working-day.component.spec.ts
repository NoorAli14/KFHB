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
import { WorkingDayComponent } from './working-day.component';

describe('WorkingDayComponent', async () => {
    let component: WorkingDayComponent;
    let fixture: ComponentFixture<WorkingDayComponent>;
    let matDialogMock: any;
    let injectorMock: any;
    let calendarServiceMock: any;
    let helper: DOMHelper<WorkingDayComponent>;
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
    dialogRefSpyObj.componentInstance = { body: '' };
    beforeEach(async(() => {
        injectorMock = jasmine.createSpyObj('Injector', ['get']);
        matDialogMock = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);
     
        calendarServiceMock = jasmine.createSpyObj(
            'CalendarService',
            ['getWorkingDays', 'createWorkingDay', 'editWorkingDay', 'deleteWorkingDay']
        );
        calendarServiceMock.getWorkingDays.and.returnValue(
          of([])
      );
        TestBed.configureTestingModule({
              
                declarations: [WorkingDayComponent,  MockComponent(UserFormComponent)],
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
        fixture = TestBed.createComponent(WorkingDayComponent);
        component = fixture.componentInstance;
        helper = new DOMHelper(fixture);
        component.ngOnInit();
        fixture.detectChanges();
    });

    describe('Working day Component Data Initialization', () => {
        it('should create Working day view component', () => {
            expect(component).toBeTruthy();
        });
      
        it('should  displayedColumns array property initialized with 7 columns ', () => {
            expect(component.displayedColumns.length).toBe(7);
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
