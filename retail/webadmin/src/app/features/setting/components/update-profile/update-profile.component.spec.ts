import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import {
    ReactiveFormsModule,
    FormsModule,
} from "@angular/forms";
import { Injector } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { DOMHelper } from "testing/dom.helper";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { User } from '@feature/entitlement/models/user.model';
import { UpdateProfileComponent } from './update-profile.component';
import { of } from 'rxjs';

describe("UpdateProfileComponent", async () => {
    let component: UpdateProfileComponent;
    let fixture: ComponentFixture<UpdateProfileComponent>;
    let injectorMock: any;
    let helper: DOMHelper<UpdateProfileComponent>;
    let model;
    let matDialogRefMock: any;
    beforeEach(async(() => {
        injectorMock = jasmine.createSpyObj("Injector", ["get"]);
        matDialogRefMock = jasmine.createSpyObj("MatDialogRef", ["close"]);
      
        TestBed.configureTestingModule({
            declarations: [UpdateProfileComponent],
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
                    provide: Injector,
                    useValue: injectorMock,
                },
                
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        model = {
            id: null,
            name: "rashid",
            description: "123",
            modules: [],
        };
        fixture = TestBed.createComponent(UpdateProfileComponent);
        component = fixture.componentInstance;
        helper = new DOMHelper(fixture);
        component.ngOnInit();
        fixture.detectChanges();
    });

    describe("Update Profile General", () => {
        it("should create UpdateProfileComponent", () => {
            expect(component).toBeTruthy();
        });
        it("should nationalityList array property initialized with more than 1 record", () => {
            expect(component.nationalityList.length).toBeGreaterThan(1)
        });
        it("should genderList array property initialized with more than 1 record", () => {
            expect(component.genderList.length).toBeGreaterThan(1)
        });
    });

    describe("User Form SUITS", () => {
        beforeEach(() => {
            model = {
                firstName: "rashid",
                username:'rashid',
                lastName: "rashid",
                contactNo: "123",
                gender: "M",
                status: "rashid",
                email: "rashid@aiondigital.com",
                dateOfBirth: "12/2/2323",
                nationalityId: 1,
            };
        })
        it("should User form initialized", () => {
            expect(component.userForm).toBeTruthy();
        });

        it("should the User create button be enable if the form is valid", () => {
            helper.setForm(component.userForm, model);
            fixture.detectChanges();
            const button: HTMLButtonElement = helper.findOne(".submit-button");
            expect(button.disabled).toBe(false);
        });

        it("should User submit button be disable if form is invalid ", () => {
            component.userForm.patchValue({ ...model, firstName: null });
            fixture.detectChanges();
            const button: HTMLButtonElement = helper.findOne(".submit-button");
            expect(button.disabled).toBe(true);
        });
       
        it("should call the onSubmit button only 1 time", () => {
            helper.setForm(component.userForm, model);
            spyOn(component, "onSubmit");
            helper.clickElement(".submit-button");
            expect(component.onSubmit).toHaveBeenCalledTimes(1);
        });
        it("should close the Dialog on cancel", () => {
            matDialogRefMock.close.and.returnValue(of([]))
            helper.clickElement('.btn-cancel')
            expect(matDialogRefMock.close).toHaveBeenCalled();
        });
        it("should call the onSubmit button only 1 time", () => {
            helper.setForm(component.userForm, model);
            spyOn(component, "onSubmit");
            helper.clickElement(".submit-button");
            expect(component.onSubmit).toHaveBeenCalledTimes(1);
        });
    });
});
