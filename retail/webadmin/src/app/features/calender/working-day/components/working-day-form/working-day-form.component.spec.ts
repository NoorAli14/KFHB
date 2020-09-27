import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingDayFormComponent } from './working-day-form.component';

describe('WorkingDayFormComponent', () => {
  let component: WorkingDayFormComponent;
  let fixture: ComponentFixture<WorkingDayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingDayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingDayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
