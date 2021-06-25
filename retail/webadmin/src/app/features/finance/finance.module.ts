import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { FinanceComponent } from './views/finance/finance.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { SharedModule } from '@shared/shared.module';
import { AdvanceSearchComponent } from './components/advance-search/advance-search.component';
import { FinanceDocumentsComponent } from './components/finance-documents/finance-documents.component';
import { GalleryModule } from '@ngx-gallery/core';
import { ApplicationDetailComponent } from './views/application-detail/application-detail.component';
import { PreviewDocumentComponent } from './components/preview-document/preview-document.component';


@NgModule({
  declarations: [FinanceComponent,AdvanceSearchComponent,  FinanceDocumentsComponent, ApplicationDetailComponent, PreviewDocumentComponent],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    SharedModule,
    FuseSharedModule,
    MaterialModule,
    GalleryModule
  ]
})
export class FinanceModule { }
