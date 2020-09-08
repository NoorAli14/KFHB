import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestListRoutingModule } from './request-list-routing.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { RequestListComponent } from './requests-list.component';

@NgModule({
    declarations: [RequestListComponent],
    imports: [
        CommonModule,
        SharedModule,
        FuseSharedModule,
        RequestListRoutingModule,
        MaterialModule
    ],
})
export class RequestListModule {}
