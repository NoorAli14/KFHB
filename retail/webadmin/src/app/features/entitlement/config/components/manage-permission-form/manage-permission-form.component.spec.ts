import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePermissionFormComponent } from './manage-permission-form.component';

describe('ManagePermissionFormComponent', () => {
  let component: ManagePermissionFormComponent;
  let fixture: ComponentFixture<ManagePermissionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePermissionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePermissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
