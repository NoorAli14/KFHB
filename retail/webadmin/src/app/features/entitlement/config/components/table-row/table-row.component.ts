import { Component, Input, Output, EventEmitter } from "@angular/core";
import {
    trigger,
    state,
    style,
    transition,
    animate,
} from "@angular/animations";
import { MESSAGES } from '@shared/constants/app.constants';
import { MatDialog } from '@angular/material/dialog';
import { getName, camelToSentenceCase } from "@shared/helpers/global.helper";
import { ConfirmDialogModel, ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';


@Component({
    selector: "app-table-row",
    templateUrl: "./table-row.component.html",
    styleUrls: ["./table-row.component.scss"],
    animations: [
        trigger("expandableRow", [
            state(
                "collapsed, void",
                style({
                    height: "0px",
                    visibility: "hidden",
                })
            ),
            state(
                "expanded",
                style({
                    "min-height": "48px",
                    height: "*",
                    visibility: "visible",
                })
            ),
            transition(
                "expanded <=> collapsed, void <=> *",
                animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
            ),
        ]),
    ],
})
export class TableRowComponent {
    @Input() dataSource: any[];
    @Input() roles: any[];
    @Input() modules: any[];
    @Input() displayedColumns: string[];
    @Input() title: string;
    @Input() renderTemplate: string;
    @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();
    @Output() addNewPermission: EventEmitter<number> = new EventEmitter<number>();

    expandedId: string = "";

    constructor(public _matDialog: MatDialog) {
    }

    toggleExpandableSymbol(id: string): void {
        this.expandedId = this.expandedId === id ? "" : id;
    }
    displayName(id, array) {
        return getName(id, "name", array);
    }
    camelToSentenceCase(text){
        return camelToSentenceCase(text)
     }
    onAddNewPermission(id) {
        this.addNewPermission.emit(id);
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
