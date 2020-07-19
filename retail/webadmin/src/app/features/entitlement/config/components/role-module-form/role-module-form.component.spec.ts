import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleModuleFormComponent } from './role-module-form.component';

describe('RoleModuleFormComponent', () => {
  let component: RoleModuleFormComponent;
  let fixture: ComponentFixture<RoleModuleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleModuleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleModuleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
