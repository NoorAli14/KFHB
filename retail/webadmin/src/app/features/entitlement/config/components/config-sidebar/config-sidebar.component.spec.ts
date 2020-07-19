import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigSidebarComponent } from './config-sidebar.component';

describe('ConfigSidebarComponent', () => {
  let component: ConfigSidebarComponent;
  let fixture: ComponentFixture<ConfigSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
