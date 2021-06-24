import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceComponent } from './views/finance/finance.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { SharedModule } from '@shared/shared.module';
import { AdvanceSearchComponent } from './components/advance-search/advance-search.component';


@NgModule({
  declarations: [FinanceComponent,AdvanceSearchComponent],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    SharedModule,
    FuseSharedModule,
    MaterialModule
  ]
})
export class FinanceModule { }
