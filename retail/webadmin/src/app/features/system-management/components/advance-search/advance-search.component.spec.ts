import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LogsAdvanceSearchComponent } from './advance-search.component';


describe('LogsAdvanceSearchComponent', () => {
  let component: LogsAdvanceSearchComponent;
  let fixture: ComponentFixture<LogsAdvanceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsAdvanceSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsAdvanceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
