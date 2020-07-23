import { MaterialModule } from './modules/material/material.module';

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatErrorComponent } from "./components/mat-error/mat-error.component";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableComponent } from './components/mat-table/mat-table.component';

@NgModule({
    declarations: [MatErrorComponent, ConfirmDialogComponent, MatTableComponent],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        FlexLayoutModule,
        MatToolbarModule,
        MaterialModule
    ],
    exports: [MatErrorComponent,MatTableComponent],

})
export class SharedModule {}
