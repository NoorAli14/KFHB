import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthenticationService } from "@shared/services/auth/authentication.service";
import { FuseConfigService } from "@fuse/services/config.service";
import { CookieService } from "ngx-cookie-service";
import { ReactiveFormsModule } from "@angular/forms";
import { Injector } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { DOMHelper } from "testing/dom.helper";
import { By } from "@angular/platform-browser";

describe("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let dh: DOMHelper<LoginComponent>;
    let fuseConfigServiceMock: any;
    let authenticationServiceMock: any;
    let cookieServiceMock: any;
    let injectorMock: any;

    beforeEach(async(() => {
        fuseConfigServiceMock = jasmine.createSpyObj("FuseConfigService", [
            "config",
        ]);
        injectorMock = jasmine.createSpyObj("Injector", ["get"]);

        authenticationServiceMock = jasmine.createSpyObj(
            "AuthenticationService",
            ["login"]
        );
        cookieServiceMock = jasmine.createSpyObj("CookieService", [
            "get",
            "set",
            "delete",
        ]);
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
                    useValue: authenticationServiceMock,
                },
                {
                    provide: Injector,
                    useValue: injectorMock,
                },
                {
                    provide: FuseConfigService,
                    useValue: fuseConfigServiceMock,
                },
                {
                    provide: CookieService,
                    useValue: cookieServiceMock,
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        dh = new DOMHelper(fixture);
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
    it("should have the login page title ", () => {
        const el = fixture.debugElement.query(By.css(".title"));
        expect(el.nativeElement.textContent).toBe("LOGIN TO YOUR ACCOUNT");
    });
});
