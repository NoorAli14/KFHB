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
import { MatTabsModule } from '@angular/material/tabs';
import { AdvanceSearchComponent } from './components/advance-search/advance-search.component';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MaterialFormsModule } from '@shared/modules/material-forms/material-forms.module';
@NgModule({
  declarations: [CustomerComponent, CustomerDetailComponent,AdvanceSearchComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    FuseSharedModule,
    MaterialModule,
    GalleryModule,
    LightboxModule,
    MaterialFormsModule,
    MatTabsModule,
    MatSortModule,
    MatAutocompleteModule
  ]
})
export class CustomerModule { }
