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

import { debounceTime, distinctUntilChanged, map, skip, takeUntil } from 'rxjs/operators';
import { Pagination } from '@shared/models/pagination.model';
import * as QueryString from 'query-string';
import { MatSortDirection } from '@shared/enums/app.enum';
import { FinanceService } from '@feature/finance/services/finance.service';


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
  displayedColumns = ['fullName', 'cpr', 'rimNo', 'financingAmount', 'tenor', 'rate',  'isCompleted', 'applicationType', 'status','createdOn',
    //'creditSheet', 'checkList',
    'action',];
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
    this.initSearch();
  }
  initParams(): object {
    return {
      applicationType: "Real Estate"
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
  initSearch(): void {
    this.control.valueChanges
      .pipe(
        skip(1),
        map((value: any) => {
          return value;
        }),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.getData({ first_name: text })
      });
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
