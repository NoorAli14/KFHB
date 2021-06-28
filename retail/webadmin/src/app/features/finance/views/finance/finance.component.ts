import { BaseComponent } from '@shared/components/base/base.component';
import { CONFIG } from '@config/index';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  Injector,
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

import {  takeUntil } from 'rxjs/operators';
import { Pagination } from '@shared/models/pagination.model';
import { MatSortDirection } from '@shared/enums/app.enum';
import { FinanceService } from '@feature/finance/services/finance.service';
import { DATE_FORMAT } from '@shared/constants/app.constants';
import * as moment from 'moment';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class FinanceComponent extends BaseComponent implements OnInit {

  applications: any[];
  userPermissions: any[];
  pageSize: number = CONFIG.PAGE_SIZE;
  pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
  nationalities: any[];
  displayedColumns = ['fullName', 'cpr', 'rimNo', 'financingAmount', 'tenor', 'rate', 'isCompleted', 'applicationType', 'status', 'createdOn', 'action',];
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

  ngOnInit(): void {
    this.config = this.initParams();
    this.getData(this.config);
    this.pagination = new Pagination();
    this.control = new FormControl();
  }
  initParams(): object {
    return {
      "dateFrom": moment().subtract(7, 'd').format(DATE_FORMAT),
      "dateTo": moment().format(DATE_FORMAT),
      "applicationType": "Real Estate",
    };
  }
  onFilter(form): void {
    if (form.dateFrom) {
      form.dateFrom = moment(form.dateFrom).format(DATE_FORMAT)
    }
    if (form.dateTo) {
      form.dateTo = moment(form.dateTo).format(DATE_FORMAT)
    }
    this.config = this.initParams();
    this.config = { ...this.config, ...form };
    this.getData(this.config);
  }
  onReset(): void {
    this.config = this.initParams();
    this.getData(this.config);
  }
 
  getData(model): void {
    this._service
      .getApplications(model)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (response) => {
          this.applications = snakeToCamelArray(response.data)
          // this.pagination = response.pagination;
          // this.pagination.page = this.pagination.page - 1;
          this.dataSource = new MatTableDataSource(this.applications);
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
