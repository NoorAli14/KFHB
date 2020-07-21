import { cloneDeep } from '@shared/helpers/global.helper';
import {
    Component,
    OnInit,
    Input,
    Output,
    AfterContentChecked,
    EventEmitter,
    ViewChild,
    AfterViewInit,
    SimpleChanges,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MESSAGES } from '@shared/constants/app.constants';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: "app-mat-table",
    templateUrl: "./mat-table.component.html",
    styleUrls: ["./mat-table.component.scss"],
})
export class MatTableComponent implements OnInit {
    @Input() data: any[];
    @Input() displayedColumns: string[];
    @Output() edit: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
    dialogRef: any;

    constructor(public _matDialog: MatDialog) {
    }
    public ngOnChanges(changes: SimpleChanges) {
        if ('data' in changes &&   changes['data'].currentValue.length>0) {
            this.dataSource =  new MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
         }
    }
    ngOnInit(): void {
        
    }
    displayName(id, array) {
        // return getName(id, "name", array);
    }
    onEditDialog(data) {
      this.edit.emit(data);
    }
    confirmDialog(): void {
        const message = MESSAGES.REMOVE_CONFIRMATION;
        const dialogData = new ConfirmDialogModel("Confirm Action", message);
        const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
            data: dialogData,
            disableClose:true,
            panelClass: "app-confirm-dialog",
            hasBackdrop: true,
        });

        dialogRef.afterClosed().subscribe((dialogResult) => {

        });
    }
}
