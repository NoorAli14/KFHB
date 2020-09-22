import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatErrorComponent } from './mat-error.component';
import { FormControl } from '@angular/forms';

describe("MatErrorComponent", async () => {
    let component: MatErrorComponent;
    let fixture: ComponentFixture<MatErrorComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MatErrorComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MatErrorComponent);
        component = fixture.componentInstance;
        component.control=new FormControl();
        fixture.detectChanges();
    });
    it("should create MatErrorComponent", () => {
        expect(component).toBeTruthy();
    });
});
