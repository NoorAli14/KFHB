import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferralsRoutingModule } from './referrals-routing.module';

import { FuseSharedModule } from '@fuse/shared.module';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { ReferralsComponent } from './views/referrals.component';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [ReferralsComponent],
    imports: [CommonModule,
        ReferralsRoutingModule,
        SharedModule,
        FuseSharedModule,
        MaterialModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    exports: [
        MatFormFieldModule,
        MatInputModule]})
export class ReferralsModule { }
