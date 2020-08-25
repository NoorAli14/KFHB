import { Component, Input, Output, EventEmitter } from "@angular/core";
import {
    trigger,
    state,
    style,
    transition,
    animate,
} from "@angular/animations";
import { MatDialog } from '@angular/material/dialog';
import { getName, camelToSentenceCase, camelToSnakeCaseText } from "@shared/helpers/global.helper";


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
    @Input() displayedColumns: string[];
    @Input() title: string;
    @Input() renderTemplate: string;

    expandedId: string = "";

    constructor(public _matDialog: MatDialog) {
    }

    toggleExpandableSymbol(id: string): void {
        this.expandedId = this.expandedId === id ? "" : id;
    }
    displayName(id, array) {
        return getName(id, "name", array);
    }
    camelToSnakeCase(text) {
        return camelToSnakeCaseText(text);
    }
    camelToSentenceCase(text){
        return camelToSentenceCase(text)
     }
}
