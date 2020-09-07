import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthenticationService } from "@shared/services/auth/authentication.service";
import { FuseConfigService } from "@fuse/services/config.service";
import { CookieService } from "ngx-cookie-service";
import { ReactiveFormsModule } from "@angular/forms";
import { MockBuilder, MockRender, ngMocks, MockComponent } from "ng-mocks";
import { BaseComponent } from "@shared/components/base/base.component";
import { Injector } from '@angular/core';

describe("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    let fuseConfigServiceMock: any;
    let authenticationServiceMock: any;
    let cookieServiceMock: any;
    let injectorMock: any;

    beforeEach(async(() => {
      
        fuseConfigServiceMock = jasmine.createSpyObj("FuseConfigService", [
            "config",
        ]);
        injectorMock = jasmine.createSpyObj("Injector", [
            "get",
        ]);
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
            declarations: [LoginComponent, MockComponent(BaseComponent)],
            imports: [RouterTestingModule, ReactiveFormsModule],
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
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
