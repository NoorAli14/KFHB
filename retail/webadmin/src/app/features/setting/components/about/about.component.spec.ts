import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AboutComponent } from "./about.component";

describe("AboutComponent", () => {
    let component: AboutComponent;
    let fixture: ComponentFixture<AboutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AboutComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AboutComponent);
        component = fixture.componentInstance;
        component.user = {};
        fixture.detectChanges();
    });

    it("should create AboutComponent", () => {
        expect(component).toBeTruthy();
    });
  
    it("should getNationality be called", () => {
        spyOn(component, "getNationality");
        component.getNationality(1);
        expect(component.getNationality).toHaveBeenCalled();
    });
});
