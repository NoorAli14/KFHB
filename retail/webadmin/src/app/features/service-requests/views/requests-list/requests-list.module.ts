import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestListRoutingModule } from './requests-list-routing.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { RequestsListComponent } from './requests-list.component';
import {MatSortModule} from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
    declarations: [RequestsListComponent],
    imports: [
        CommonModule,
        SharedModule,
        FuseSharedModule,
        RequestListRoutingModule,
        MaterialModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    exports: [
        MatFormFieldModule,
        MatInputModule]})
export class RequestsListModule {}
