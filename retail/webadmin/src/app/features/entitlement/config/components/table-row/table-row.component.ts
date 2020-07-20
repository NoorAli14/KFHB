import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss'],
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

  @Input() dataSource: any[] ;
  @Input() displayedColumns: string[];
  @Input() title: string;
  @Input() referenceId: string;
  @Input() iconKeyReference: string;
  @Input() renderTemplate: string;

  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  expandedId: string = '';

  constructor() {}

  toggleExpandableSymbol(id: string): void {
    debugger
    this.expandedId = this.expandedId === id ? '' : id;
  }

}