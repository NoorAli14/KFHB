import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-aml-screening',
  templateUrl: './aml-screening.component.html',
  styleUrls: ['./aml-screening.component.scss']
})
export class AmlScreeningComponent implements OnInit, OnChanges {
  @Input() amlData: any;
  @Input() status: any;
  amlsdnDetailsList: Array<any>;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.amlData.currentValue) {
      this.amlsdnDetailsList = this.amlData.sdnDetailsList?.sdnDetailsList;
      if (this.amlsdnDetailsList && !Array.isArray(this.amlsdnDetailsList)) {
        this.amlsdnDetailsList = [this.amlsdnDetailsList]
      }
    }
  }
}
