import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DOMHelper } from 'testing/dom.helper';
import { of } from 'rxjs';

describe('ConfirmDialogComponent', async () => {
    let component: ConfirmDialogComponent;
    let fixture: ComponentFixture<ConfirmDialogComponent>;
    let matDialogRefMock: any;
    let helper: DOMHelper<ConfirmDialogComponent>;
    beforeEach(async(() => {
        matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
        TestBed.configureTestingModule({
            declarations: [ConfirmDialogComponent],
            providers: [
                {
                    provide: MAT_DIALOG_DATA, useValue: {} 
                },
                {
                    provide: MatDialogRef,
                    useValue: matDialogRefMock,
                },
               
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmDialogComponent);
        component = fixture.componentInstance;
        helper = new DOMHelper(fixture);
        fixture.detectChanges();
    });

    it('should create ConfirmDialogComponent', () => {
        expect(component).toBeTruthy();
    });
    it('should close the Dialog on confirm', () => {
        matDialogRefMock.close.and.returnValue(of([]));
        helper.clickElement('.btn-confirm');
        expect(matDialogRefMock.close).toHaveBeenCalled();
    });
    it('should close the Dialog on cancel', () => {
        matDialogRefMock.close.and.returnValue(of([]));
        helper.clickElement('.btn-cancel');
        expect(matDialogRefMock.close).toHaveBeenCalled();
    });
});
