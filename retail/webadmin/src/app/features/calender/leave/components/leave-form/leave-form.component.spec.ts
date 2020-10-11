import { of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    ReactiveFormsModule,
    FormsModule,
} from '@angular/forms';
import { Injector } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DOMHelper } from 'testing/dom.helper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LeaveFormComponent } from './leave-form.component';
import { Leave } from '@feature/calender/models/leave.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('LeaveFormComponent', async () => {
    let component: LeaveFormComponent;
    let fixture: ComponentFixture<LeaveFormComponent>;
    let injectorMock: any;
    let helper: DOMHelper<LeaveFormComponent>;
    let model;
    let matDialogRefMock: any;
    let authUserServiceMock: any;
    beforeEach(async(() => {
        injectorMock = jasmine.createSpyObj('Injector', ['get']);
        matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
        authUserServiceMock = jasmine.createSpyObj('AuthUserService', ['User']);
        authUserServiceMock.User.and.returnValue(
          of({roles: []})
      );
        TestBed.configureTestingModule({
            declarations: [LeaveFormComponent],
            imports: [
                ReactiveFormsModule,
                NoopAnimationsModule,
                FormsModule,
                MatAutocompleteModule
            ],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: matDialogRefMock,
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                      leave: new Leave(),
                      leaveTypes: [],
                      users: []
                    },
                },
                {
                    provide: Injector,
                    useValue: injectorMock,
                }
               
            ],
        }).compileComponents();
    }));
 
});
