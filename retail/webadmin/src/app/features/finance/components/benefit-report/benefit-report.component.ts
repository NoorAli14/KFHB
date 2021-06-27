import { BaseComponent } from '@shared/components/base/base.component';
import { CONFIG } from '@config/index';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  camelToSentenceCase,
  camelToSnakeCaseText,
  snakeToCamelArray,
  toggleSort,
} from '@shared/helpers/global.helper';

import { takeUntil } from 'rxjs/operators';
import { Pagination } from '@shared/models/pagination.model';
import * as QueryString from 'query-string';
import { MatSortDirection } from '@shared/enums/app.enum';
import { FinanceService } from '@feature/finance/services/finance.service';

@Component({
  selector: 'app-benefit-report',
  templateUrl: './benefit-report.component.html',
  styleUrls: ['./benefit-report.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class BenefitReportComponent extends BaseComponent implements OnInit,OnChanges {
  @Input() liabilities: any[];
  userPermissions: any[];
  pageSize: number = CONFIG.PAGE_SIZE;
  pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
  nationalities: any[];
  displayedColumns = ['name', 'loanAmount', 'outstandingAmount', 'installment', 'doSettle', 'subscriberName', 'numberOfAccountHolder', 'accountPosition', 'paymentFrequency', 'firstMissedPaymentDate', 'lastMissedPaymentDate', 'overdueAmount', 'numberOfPayment', 'amountStatus', 'loanDuration', 'maturityDate', 'openDate', 'paymentMethod'];
  pagination: Pagination;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  previousFilterState: MatSortDirection;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  config: object;
  control: FormControl;
  constructor(
    private _service: FinanceService,
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
    this.config = this.initParams();
    this.pagination = new Pagination();
    this.control = new FormControl();
  }
  initParams(): object {
    return {
      limit: CONFIG.PAGE_SIZE,
      page: 1,
      sort_order: MatSortDirection.desc,
      sort_by: 'first_name',
    };
  }
  getQueryString(params): string {
    return QueryString.stringify(params);
  }
  onFilter(form): void {
    this.config = this.initParams();
    this.config = { ...form, ...this.config, };
    this.getData(this.config);
  }
  onReset(): void {
    this.config = this.initParams();
    this.getData({});
  }
  createQueryObject(params): any {
    return {
      ...this.config,
      ...params,
    };
  }
  getData(params): void {
    const queryParams = QueryString.stringify(
      this.createQueryObject(params)
    );

    this._service
      .getApplications(queryParams)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (response) => {
          this.liabilities = response.data;
          // this.pagination = response.pagination;
          // this.pagination.page = this.pagination.page - 1;
          
          this.dataSource = new MatTableDataSource(this.liabilities);
        },
        (response) => super.onError(response))
  }

  camelToSnakeCase(text): void {
    return camelToSnakeCaseText(text);
  }

  camelToSentenceCase(text): string {
    return camelToSentenceCase(text);
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  sortData(e): void {
    this.previousFilterState = toggleSort(this.previousFilterState, e.direction);
    this.sort.direction = this.previousFilterState;
    this.getData({ sort_order: this.previousFilterState, sort_by: camelToSnakeCaseText(e.active) });
  }
  onPageFired(data): void {
    this.getData({ page: data['pageIndex'] + 1, limit: data['pageSize'] });
  }

}
