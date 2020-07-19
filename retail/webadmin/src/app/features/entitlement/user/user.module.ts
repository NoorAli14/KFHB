import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./views/user/user.component";
import { FuseSharedModule } from "@fuse/shared.module";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';

@NgModule({
    declarations: [UserComponent, UserFormComponent],
    entryComponents: [UserFormComponent],
    imports: [
        CommonModule,
        SharedModule,
        FuseSharedModule,
        UserRoutingModule,
        MaterialModule
    ],
})
export class UserModule {}
