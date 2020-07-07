import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./views/user/user.component";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { FuseSharedModule } from "@fuse/shared.module";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
    declarations: [UserComponent, UserFormComponent],
    entryComponents: [UserFormComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatMenuModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRippleModule,
        MatSelectModule,
        MatTooltipModule,
        FuseSharedModule,
        UserRoutingModule,
        MatButtonModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatDialogModule,
        MatTableModule,
        MatIconModule,
        MatRippleModule,
    ],
})
export class UserModule {}
