import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuseSharedModule } from '@fuse/shared.module';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InternationalTransferRequestsComponent } from './views/international-transfer-requests/international-transfer-requests.component';
import { InternationalTransferRequestsRoutingModule } from './international-transfer-requests-routing.module';
import { DialogInternationalTransferStatusComponent } from './views/dialog-international-transfer-status/dialog-international-transfer-status.component';

@NgModule({
    declarations: [InternationalTransferRequestsComponent, DialogInternationalTransferStatusComponent],
    imports: [CommonModule,
        InternationalTransferRequestsRoutingModule,
        SharedModule,
        FuseSharedModule,
        MaterialModule,
        // MatSortModule,
        // MatFormFieldModule,
        // MatInputModule,
    ],
    exports: [
        MaterialModule
        // MatFormFieldModule,
        // MatInputModule
    ]})
export class InternationalTransferRequestsModule { }
