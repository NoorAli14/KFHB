import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultTextComponent } from './default-text.component';

describe('DefaultTextComponent', async () => {
    let component: DefaultTextComponent;
    let fixture: ComponentFixture<DefaultTextComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DefaultTextComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultTextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create DefaultTextComponent', () => {
        expect(component).toBeTruthy();
    });
});
