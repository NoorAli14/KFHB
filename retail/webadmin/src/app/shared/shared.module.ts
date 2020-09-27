import { PermissionDirective } from './directives/permission/permission.directive';
import { MaterialModule } from "./modules/material/material.module";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatErrorComponent } from "./components/mat-error/mat-error.component";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { WClockComponent } from "./components/time-control/w-clock.component";
import { WTimeDialogComponent } from "./components/time-control/w-time-dialog.component";
import { BaseComponent } from './components/base/base.component';
import { DefaultTextComponent } from './components/default-text/default-text.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { RequiredIndicatorComponent } from './components/required-indicator/required-indicator.component';

@NgModule({
    declarations: [
        MatErrorComponent,
        ConfirmDialogComponent,
        WClockComponent,
        WTimeDialogComponent,
        PermissionDirective,
        BaseComponent,
        DefaultTextComponent,
        MessageBoxComponent,
        RequiredIndicatorComponent,
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        FlexLayoutModule,
        MatToolbarModule,
        MaterialModule,
    ],
    entryComponents: [WTimeDialogComponent],
    exports: [
        MatErrorComponent,
        WTimeDialogComponent,
        PermissionDirective,
        MessageBoxComponent,
        BaseComponent,
        DefaultTextComponent,
        RequiredIndicatorComponent
    ],
})
export class SharedModule {}
