import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './views/customer/customer.component';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { MaterialModule } from '@shared/modules/material/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedModule } from '@shared/shared.module';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';

@NgModule({
  declarations: [CustomerComponent, CustomerDetailComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    FuseSharedModule,
    MaterialModule,
    GalleryModule,
    LightboxModule
  ]
})
export class CustomerModule { }
