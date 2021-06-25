import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceDocumentsComponent } from './finance-documents.component';

describe('FinanceDocumentsComponent', () => {
  let component: FinanceDocumentsComponent;
  let fixture: ComponentFixture<FinanceDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
