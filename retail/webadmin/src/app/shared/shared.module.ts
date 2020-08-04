import { MaterialModule } from './modules/material/material.module';

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatErrorComponent } from "./components/mat-error/mat-error.component";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableComponent } from './components/mat-table/mat-table.component';
import { WClockComponent } from './components/time-control/w-clock.component';
import { WTimeDialogComponent } from './components/time-control/w-time-dialog.component';

@NgModule({
    declarations: [MatErrorComponent, ConfirmDialogComponent, MatTableComponent,WClockComponent,WTimeDialogComponent],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        FlexLayoutModule,
        MatToolbarModule,
        MaterialModule
    ],
    entryComponents:[WTimeDialogComponent],
    exports: [MatErrorComponent,MatTableComponent,WTimeDialogComponent,],

})
export class SharedModule {}
