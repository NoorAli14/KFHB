import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./views/user/user.component";
import { FuseSharedModule } from "@fuse/shared.module";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { SharedModule } from '@shared/shared.module';
import { MaterialFormsModule } from '@shared/modules/material-forms/material-forms.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
@NgModule({
    declarations: [UserComponent, UserFormComponent],
    entryComponents: [UserFormComponent],
    imports: [
        CommonModule,
        SharedModule,
        FuseSharedModule,
        MaterialFormsModule,
        MatSortModule,
        UserRoutingModule,
        MatPaginatorModule
    ],
})
export class UserModule {}
