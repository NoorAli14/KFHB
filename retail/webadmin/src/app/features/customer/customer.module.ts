import { MaterialFormsModule } from './../../shared/modules/material-forms/material-forms.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './views/customer/customer.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { MaterialModule } from '@shared/modules/material/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [CustomerComponent, CustomerDetailComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    FuseSharedModule,
    MaterialModule
  ]
})
export class CustomerModule { }
