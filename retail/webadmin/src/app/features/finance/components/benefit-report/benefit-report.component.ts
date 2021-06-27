import { BaseComponent } from '@shared/components/base/base.component';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource } from '@angular/material/table';
import {
  camelToSentenceCase,
  camelToSnakeCaseText,
  snakeToCamelArray,
} from '@shared/helpers/global.helper';


@Component({
  selector: 'app-benefit-report',
  templateUrl: './benefit-report.component.html',
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class BenefitReportComponent extends BaseComponent implements OnInit,OnChanges {
  @Input() liabilities: any[];
  displayedColumns = ['name', 'loanAmount', 'outstandingAmount', 'installment', 'doSettle', 'subscriberName', 'numberOfAccountHolder', 'accountPosition', 'paymentFrequency', 'firstMissedPaymentDate', 'lastMissedPaymentDate', 'overdueAmount', 'numberOfPayment', 'amountStatus', 'loanDuration', 'maturityDate', 'openDate', 'paymentMethod'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(
    injector: Injector
  ) {
    super(injector);
    super.ngOnInit();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.liabilities.previousValue!=changes.liabilities.currentValue){
      const data=snakeToCamelArray(this.liabilities);
      this.dataSource = new MatTableDataSource(data);
    }
  }

  ngOnInit(): void {
  }

  camelToSnakeCase(text): void {
    return camelToSnakeCaseText(text);
  }

  camelToSentenceCase(text): string {
    return camelToSentenceCase(text);
  }
}
