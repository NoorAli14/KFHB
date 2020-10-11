import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    ReactiveFormsModule,
    FormsModule,
} from '@angular/forms';
import { Injector } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DOMHelper } from 'testing/dom.helper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HolidayFormComponent } from './holiday-form.component';
import { Holiday } from '@feature/calender/models/holiday.model';
import { NotifierService } from '@shared/services/notifier/notifier.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('HolidayFormComponent', async () => {
    let component: HolidayFormComponent;
    let fixture: ComponentFixture<HolidayFormComponent>;
    let injectorMock: any;
    let helper: DOMHelper<HolidayFormComponent>;
    let model;
    let matDialogRefMock: any;
    let notifierServiceMock: any;
    let matSnackBarMock: any;
    beforeEach(async(() => {
        injectorMock = jasmine.createSpyObj('Injector', ['get']);
        matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
        notifierServiceMock = jasmine.createSpyObj('NotifierService', ['success', 'error']);
        matSnackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);
        TestBed.configureTestingModule({
            declarations: [HolidayFormComponent],
            imports: [
                ReactiveFormsModule,
                NoopAnimationsModule,
                FormsModule,
            ],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: matDialogRefMock,
                },
                {
                    provide: MatSnackBar,
                    useValue: matSnackBarMock,
                },
                {
                    provide: NotifierService,
                    useValue: notifierServiceMock,
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                    data:  new Holiday()
                    },
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
            holidayDate: '1/1/2020',
            description: '123',
            remarks: 'test',
        };
        fixture = TestBed.createComponent(HolidayFormComponent);
        component = fixture.componentInstance;
        helper = new DOMHelper(fixture);
        component.ngOnInit();
        fixture.detectChanges();
    });

    describe('Holiday Form General', () => {
        it('should create HolidayFormComponent', () => {
            expect(component).toBeTruthy();
        });
    });

    describe('Holiday Form SUITS', () => {
       
        it('should Holiday form initialized', () => {
            expect(component.holidayForm).toBeTruthy();
        });

        it('should the Holiday create button be enable if the form is valid', () => {
            helper.setForm(component.holidayForm, model);
            fixture.detectChanges();
            const button: HTMLButtonElement = helper.findOne('.submit-button');
            expect(button.disabled).toBe(false);
        });
        it('should Holiday submit button be disable if form is invalid ', () => {
            component.holidayForm.patchValue({ ...model, remarks: null });
            fixture.detectChanges();
            const button: HTMLButtonElement = helper.findOne('.submit-button');
            expect(button.disabled).toBe(true);
        });
       
        it('should call the onSubmit button only 1 time', () => {
            helper.setForm(component.holidayForm, model);
            spyOn(component, 'onSubmit');
            helper.clickElement('.submit-button');
            expect(component.onSubmit).toHaveBeenCalledTimes(1);
        });
    });
});
