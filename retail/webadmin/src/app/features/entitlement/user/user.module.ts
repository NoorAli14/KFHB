import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './views/user/user.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { DetailItemComponent } from './components/detail-item/detail-item.component';

@NgModule({
    declarations: [UserComponent, UserFormComponent, UserDetailComponent, DetailItemComponent],
    entryComponents: [UserFormComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule,
        FuseSharedModule,
        MaterialModule
    ],
})
export class UserModule {}
