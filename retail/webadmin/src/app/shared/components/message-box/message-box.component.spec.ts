import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBoxComponent } from './message-box.component';

describe('MessageBoxComponent', () => {
    let component: MessageBoxComponent;
    let fixture: ComponentFixture<MessageBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MessageBoxComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageBoxComponent);
        component = fixture.componentInstance;
        component.responseMessage = '';
        fixture.detectChanges();
    });

    it('should create MessageBoxComponent', () => {
        expect(component).toBeTruthy();
    });
    it('should show the message box if there is any error', () => {
        component.responseMessage = 'Hello';
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
