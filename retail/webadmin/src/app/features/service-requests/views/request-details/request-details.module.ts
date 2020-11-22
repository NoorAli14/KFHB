import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestDetailsRoutingModule } from './request-details-routing.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { RequestDetailsComponent } from './request-details.component';
import { MaterialFormsModule } from '@shared/modules/material-forms/material-forms.module';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
    declarations: [RequestDetailsComponent],
    imports: [
        CommonModule,
        SharedModule,
        FuseSharedModule,
        RequestDetailsRoutingModule,
        MaterialModule,
        MatTabsModule,
        MaterialFormsModule,
    ],
})
export class RequestDetailsModule {}
