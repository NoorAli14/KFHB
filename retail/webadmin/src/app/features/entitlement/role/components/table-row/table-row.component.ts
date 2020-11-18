import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    SimpleChanges,
    OnChanges,
    Injector,
} from "@angular/core";
import {
    trigger,
    state,
    style,
    transition,
    animate,
} from "@angular/animations";
import { MatDialog } from "@angular/material/dialog";
import {
    getName,
    camelToSentenceCase,
    camelToSnakeCaseText,
} from "@shared/helpers/global.helper";
import { CONFIG } from "@config/index";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { BaseComponent } from "@shared/components/base/base.component";
import { MatTableDataSource } from "@angular/material/table";
import { MODULES } from "@shared/constants/app.constants";
import { Pagination } from "@shared/models/pagination.model";
import * as QueryString from "query-string";

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
export class TableRowComponent extends BaseComponent implements OnChanges {
    @Input() roles: any;
    @Input() displayedColumns: string[];
    @Input() permissions: string[];
    @Output() delete = new EventEmitter();
    @Output() edit = new EventEmitter();
    @Output() change = new EventEmitter();
    pageSize: number = CONFIG.PAGE_SIZE;
    pagination: Pagination;
    pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
    expandedId = "";
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
    config: object;
    constructor(public _matDialog: MatDialog, injector: Injector) {
        super(injector, MODULES.ROLE_MANAGEMENT);
        this.pagination = new Pagination();
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.roles.currentValue !== changes.roles.previousValue) {
            if (this.roles.data && this.roles.data.length > 0) {
                this.pagination = this.roles["pagination"];
                this.pagination.page = this.pagination.page - 1;
            }
            this.dataSource = new MatTableDataSource(this.roles.data);
        }
    }

    toggleExpandableSymbol(id: string): void {
        this.expandedId = this.expandedId === id ? "" : id;
    }
    displayName(id, array): string {
        return getName(id, "name", array);
    }
    camelToSnakeCase(text): string {
        return camelToSnakeCaseText(text);
    }
    camelToSentenceCase(text): string {
        return camelToSentenceCase(text);
    }
    onDelete(id): void {
        this.delete.emit(id);
    }
    onEdit(data): void {
        this.edit.emit(data);
    }
    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    sortData(e): void {
        this.change.emit({
            sort_order: e.direction ? e.direction : "asc",
            sort_by: camelToSnakeCaseText(e.active),
        });
    }
    onPageFired(data): void {
        this.change.emit({ page: data["pageIndex"] + 1, limit: data["pageSize"] });
    }
}
