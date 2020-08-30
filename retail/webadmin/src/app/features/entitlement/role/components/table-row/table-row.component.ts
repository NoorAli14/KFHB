import { Component, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import {
    trigger,
    state,
    style,
    transition,
    animate,
} from "@angular/animations";
import { MatDialog } from '@angular/material/dialog';
import { getName, camelToSentenceCase, camelToSnakeCaseText } from "@shared/helpers/global.helper";
import { CONFIG } from '@config/index';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


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
    pageSize:number=CONFIG.PAGE_SIZE;
    pageSizeOptions:Array<number>=CONFIG.PAGE_SIZE_OPTIONS;
    expandedId: string = "";
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    
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
