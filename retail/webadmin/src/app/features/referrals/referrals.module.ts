import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferralsRoutingModule } from './referrals-routing.module';

import { FuseSharedModule } from '@fuse/shared.module';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { ReferralsComponent } from './components/referrals.component';

@NgModule({
    declarations: [ReferralsComponent],
    imports: [CommonModule, 
        ReferralsRoutingModule,
        SharedModule,
        FuseSharedModule,
        MaterialModule
    ]})
export class ReferralsModule {}
