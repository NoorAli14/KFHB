import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
=======
<<<<<<< HEAD:retail/webadmin/src/app/shared/components/required-indicator/required-indicator.component.spec.ts
import { RequiredIndicatorComponent } from './required-indicator.component';

describe('RequiredIndicatorComponent', () => {
  let component: RequiredIndicatorComponent;
  let fixture: ComponentFixture<RequiredIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequiredIndicatorComponent ]
=======
>>>>>>> ae278bc7285c4ba915a00a004306aff7e8e670a8
import { CustomerDetailComponent } from './customer-detail.component';

describe('CustomerDetailComponent', () => {
  let component: CustomerDetailComponent;
  let fixture: ComponentFixture<CustomerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDetailComponent ]
<<<<<<< HEAD
=======
>>>>>>> ae278bc7285c4ba915a00a004306aff7e8e670a8:retail/webadmin/src/app/features/customer/components/customer-detail/customer-detail.component.spec.ts
>>>>>>> ae278bc7285c4ba915a00a004306aff7e8e670a8
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD
    fixture = TestBed.createComponent(CustomerDetailComponent);
=======
<<<<<<< HEAD:retail/webadmin/src/app/shared/components/required-indicator/required-indicator.component.spec.ts
    fixture = TestBed.createComponent(RequiredIndicatorComponent);
=======
    fixture = TestBed.createComponent(CustomerDetailComponent);
>>>>>>> ae278bc7285c4ba915a00a004306aff7e8e670a8:retail/webadmin/src/app/features/customer/components/customer-detail/customer-detail.component.spec.ts
>>>>>>> ae278bc7285c4ba915a00a004306aff7e8e670a8
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
