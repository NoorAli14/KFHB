import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthenticationService } from "@shared/services/auth/authentication.service";
import { FuseConfigService } from "@fuse/services/config.service";
import { ReactiveFormsModule, AbstractControl, FormGroup } from "@angular/forms";
import { Injector } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { of } from 'rxjs';

describe("LoginComponent", async () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let fuseConfigServiceMock: any;
    let authenticationMock: any;
    let injectorMock: any;
    let helper: DOMHelper<LoginComponent>;

    beforeEach(async(() => {
        fuseConfigServiceMock = jasmine.createSpyObj("FuseConfigService", [
            "config",
        ]);
        injectorMock = jasmine.createSpyObj("Injector", ["get"]);

        authenticationMock = jasmine.createSpyObj(
            "AuthenticationService",
            ["login"]
        );
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                RouterTestingModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
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
                }
               
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        helper = new DOMHelper(fixture);
        fixture.detectChanges();
    });

    it("should create login component", () => {
        expect(component).toBeTruthy();
    });
    it("should have the login page title ", () => {
        
        const el = fixture.debugElement.query(By.css(".title"));
        expect(el.nativeElement.textContent).toBe("LOGIN TO YOUR ACCOUNT");
    });
    it("should have 5 buttons on login page ", () => {
        const buttons = fixture.debugElement.queryAll(By.css("button"));
        expect(buttons.length).toBe(5);
    });
    it("should the login button be enable if the form is valid", () => {
        helper.setForm(component.loginForm,{
            email: "test@gmail.com",
            password: "hello",
        })
        fixture.detectChanges();
        const button: HTMLButtonElement = helper.findOne(".submit-button")
        expect(button.disabled).toBe(false);
    });
    it("should login button be disable if form is invalid ", () => {
        component.loginForm.patchValue({ email: null, password: null });
        fixture.detectChanges();
        const button: HTMLButtonElement =  helper.findOne(".submit-button")
        expect(button.disabled).toBe(true);
    });

    it("should login form initialized", () => {
        expect(component.loginForm).toBeTruthy();
    });

    it("should login form has email and password fields ", () => {
        expect(component.loginForm.get('email')).toBeTruthy();
        expect(component.loginForm.get('password')).toBeTruthy();
    });

    it("should email and password be required ", () => {
        expect(component.loginForm.get('email').validator({} as AbstractControl)).toBeTruthy();
        expect(component.loginForm.get('password').validator({} as AbstractControl)).toBeTruthy();
    });
    it("should have the login submit button ", () => {
       expect( helper.findOne(".submit-button")).toBeTruthy();
    });

    it("should call the onSubmit button only 1 time", () => {
        helper.setForm(component.loginForm,{
            email: "test@gmail.com",
            password: "hello",
        })
        spyOn(component, 'onSubmit');
        fixture.detectChanges();
        helper.clickElement(".submit-button")
        expect(component.onSubmit).toHaveBeenCalledTimes(1)
    });
    it("should call the authentication service one time ", () => {
        helper.setForm(component.loginForm,{
            email: "test@gmail.com",
            password: "hello",
        })
        
        fixture.detectChanges();
        helper.clickElement(".submit-button")
        expect(authenticationMock.login).toHaveBeenCalledTimes(1)
    });
    // it("should redirect the user to /ent/user page after successful login",async () => {
    //     const model={
    //         email: "test@gmail.com",
    //         password: "hello",
    //     }
    //     component.loginForm.patchValue(model);
    //     authenticationMock.login.and.returnValue(of(model));
    //     const button: HTMLButtonElement = fixture.debugElement.query(
    //         By.css(".submit-button")
    //     ).nativeElement;
    //     button.click();
    //     fixture.detectChanges();
    //     expect(authenticationMock.login).toBe(true)
    // });
});

export class DOMHelper<T> {
  private fixture: ComponentFixture<T>
  constructor(fixture: ComponentFixture<T>) {
    this.fixture = fixture;
  }

  clickElement(tagName){
    const button: HTMLButtonElement = this.fixture.debugElement.query(
        By.css(tagName)
    ).nativeElement;
    button.click();
  }
  findOne(tagName){
    return this.fixture.debugElement.query(
        By.css(tagName)
    ).nativeElement;
  }
  setForm(form: FormGroup,value){
      form.patchValue(value)
  }
}
