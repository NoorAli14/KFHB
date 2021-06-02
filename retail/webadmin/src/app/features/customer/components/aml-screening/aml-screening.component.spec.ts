import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmlScreeningComponent } from './aml-screening.component';

describe('AmlScreeningComponent', () => {
  let component: AmlScreeningComponent;
  let fixture: ComponentFixture<AmlScreeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmlScreeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmlScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
