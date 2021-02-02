import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobCustomerDetailComponent } from './cob-customer-detail.component';

describe('CobCustomerDetailComponent', () => {
  let component: CobCustomerDetailComponent;
  let fixture: ComponentFixture<CobCustomerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobCustomerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobCustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
