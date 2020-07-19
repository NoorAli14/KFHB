import { MatPaginatorModule } from '@angular/material/paginator';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRippleModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatButtonModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatTooltipModule,
        MatToolbarModule,
        MatDialogModule,
        MatTableModule,
        MatIconModule,
        MatCheckboxModule,
        MatRippleModule,
        MatPaginatorModule
    ],
    exports: [
        MatMenuModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatTooltipModule,
        MatButtonModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatDialogModule,
        MatTableModule,
        MatIconModule,
        MatRippleModule,
        MatCheckboxModule,
        MatPaginatorModule,
    ],
})
export class MaterialModule {}
