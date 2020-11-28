import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LogsAdvanceSearchComponent } from './advance-search.component';

<<<<<<< HEAD:retail/webadmin/src/app/features/customer/components/customer-detail/customer-detail.component.spec.ts
import { CustomerDetailComponent } from './customer-detail.component';

describe('CustomerDetailComponent', () => {
  let component: CustomerDetailComponent;
  let fixture: ComponentFixture<CustomerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDetailComponent ]
=======

describe('LogsAdvanceSearchComponent', () => {
  let component: LogsAdvanceSearchComponent;
  let fixture: ComponentFixture<LogsAdvanceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsAdvanceSearchComponent ]
>>>>>>> ae278bc7285c4ba915a00a004306aff7e8e670a8:retail/webadmin/src/app/features/system-management/components/advance-search/advance-search.component.spec.ts
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD:retail/webadmin/src/app/features/customer/components/customer-detail/customer-detail.component.spec.ts
    fixture = TestBed.createComponent(CustomerDetailComponent);
=======
    fixture = TestBed.createComponent(LogsAdvanceSearchComponent);
>>>>>>> ae278bc7285c4ba915a00a004306aff7e8e670a8:retail/webadmin/src/app/features/system-management/components/advance-search/advance-search.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
