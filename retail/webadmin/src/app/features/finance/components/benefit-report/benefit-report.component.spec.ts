import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitReportComponent } from './benefit-report.component';

describe('BenefitReportComponent', () => {
  let component: BenefitReportComponent;
  let fixture: ComponentFixture<BenefitReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
