
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatErrorComponent } from "./components/mat-error/mat-error.component";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { MatButtonModule } from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [MatErrorComponent, ConfirmDialogComponent],
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        CommonModule,
        MatIconModule,
        MatToolbarModule,
        FlexLayoutModule,
    ],
    exports: [MatErrorComponent],

})
export class SharedModule {}
