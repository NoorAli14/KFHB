import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmlStatusComponent } from './aml-status.component';

describe('AmlStatusComponent', () => {
  let component: AmlStatusComponent;
  let fixture: ComponentFixture<AmlStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmlStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmlStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
