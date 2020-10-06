import { BaseComponent } from '@shared/components/base/base.component';
import { CONFIG } from '../../../config';
import { Component, OnInit, ViewEncapsulation, ViewChild, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  camelToSentenceCase,
  camelToSnakeCaseText,
  snakeToCamelObject,
  removeRandom,
} from '@shared/helpers/global.helper';
import { Referral } from '../model/referral.model';
import { ReferralService } from '../services/referral.service';


@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class ReferralsComponent extends BaseComponent implements OnInit {
  dialogRef: any;
  referrals: Referral[];
  username: FormControl;
  pageSize: number = CONFIG.PAGE_SIZE;
  pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
  displayedColumns = [
    'requestType',
    'nameOfReferringCustomer',
    'referringCustomerEmail',
    'referringCustomerMobileNo​',
    'rimOfReferringCustomer​',
    'dateOfAccountOpening​',
    'referredCustomerEmail',
    'referredCustomerMobileNo​',
    'rimOfReferredCustomer​',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(public _matDialog: MatDialog, private _service: ReferralService, injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.getData();
  }
  camelToSnakeCase(text): void {
    return camelToSnakeCaseText(text);
  }
  camelToSentenceCase(text): void {
    return camelToSentenceCase(text);
  }
  updateGrid(data): void {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getData = () => {
    this._service
      .getTransactions().pipe().subscribe(
        (response) => {
          this.referrals = response.data;
          this.updateGrid(this.referrals);
        },
        (response) => super.onError(response)
      );
  }
  downloadReport = () => {
    this._service
      .getTransactionsReport().pipe().subscribe(
        (response) => {
          this.convertBase64ToExcel(response.data);
        },
        (response) => super.onError(response)
      );
  }
  convertBase64ToExcel = (data) => {
    const date = new Date();
    const linkSource = 'data:application/excel;base64,' + data;
    const downloadLink = document.createElement('a');
    const fileName = 'REPORT' + date.getDate() + '.' + date.getMonth() + 1 + '.' + date.getFullYear() + '.xlsx';
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
