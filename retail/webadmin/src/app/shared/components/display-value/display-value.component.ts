import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-display-value',
  templateUrl: './display-value.component.html',
  styleUrls: ['./display-value.component.scss']
})
export class DisplayValueComponent implements OnChanges {
  @Input() prop: any;
  isNumber:boolean;
  isString:boolean;
  isBoolean:boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.prop.previousValue!=changes.prop.currentValue){
      switch (typeof this.prop) {
        case 'number':
          this.isNumber=true;
          break;
        case 'string':
          this.isString=true;
          break;
        case 'boolean':
          this.isBoolean=true;
          break;
      }
    }
  }
}
