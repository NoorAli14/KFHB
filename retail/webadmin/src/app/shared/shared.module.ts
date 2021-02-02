import { PermissionDirective } from './directives/permission/permission.directive';
import { MaterialModule } from './modules/material/material.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatErrorComponent } from './components/mat-error/mat-error.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WClockComponent } from './components/time-control/w-clock.component';
import { WTimeDialogComponent } from './components/time-control/w-time-dialog.component';
import { BaseComponent } from './components/base/base.component';
import { DefaultTextComponent } from './components/default-text/default-text.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { RequiredIndicatorComponent } from './components/required-indicator/required-indicator.component';
import { StatusComponent } from './components/status/status.component';
import { DateFormatPipe } from './pipes/date/date.pipe';
import { DateTimeFormatPipe } from './pipes/date-time/date-time.pipe';
import { DynamicInputComponent } from './components/dynamic-input/dynamic-input.component';
import { MatRadioModule } from '@angular/material/radio';

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
        StatusComponent,
        DateFormatPipe,
        DateTimeFormatPipe,
        DynamicInputComponent,
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        MatRadioModule,
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
        RequiredIndicatorComponent,
        StatusComponent,
        DateFormatPipe,
        DateTimeFormatPipe,
        DynamicInputComponent
    ],
})
export class SharedModule {}
