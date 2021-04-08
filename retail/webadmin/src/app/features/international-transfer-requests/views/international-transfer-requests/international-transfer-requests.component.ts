
import { Component, OnInit, ViewEncapsulation, ViewChild, Injector } from '@angular/core';
import { BaseComponent } from '@shared/components/base/base.component';
import { CONFIG } from '../../../../config';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  camelToSentenceCase,
  camelToSnakeCaseText,
  snakeToCamelObject,
  removeRandom,
} from '@shared/helpers/global.helper';
import { InternationalTransferRequestsService } from '@feature/international-transfer-requests/services/international-transfer-requests.service';
import { DialogInternationalTransferStatusComponent } from '../dialog-international-transfer-status/dialog-international-transfer-status.component';
import { Pagination } from '@shared/models/pagination.model';
// import { Referral } from '../model/referral.model';


@Component({
  selector: 'app-international-transfer-requests',
  templateUrl: './international-transfer-requests.component.html',
  styleUrls: ['./international-transfer-requests.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class InternationalTransferRequestsComponent extends BaseComponent implements OnInit {

  internationalTransfers = []
  username: FormControl;
  pageSize: number = CONFIG.PAGE_SIZE;
  pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
  displayedColumns = [
    'date',
    'accountNo',
    'customerName',
    'accountCurrency',
    'localAmount',
    'ex.Rate',
    'beneficiary',
    'beneficiaryName',
    'beneficiaryBank',
    'transferCurrency',
    'transferAmount',
    'status',
    'action'
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  searchForm = new FormGroup({
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    status: new FormControl(''),
  })
  statusDropdown = [
    { text: 'Pending', value: 1 },
    { text: 'Completed', value: 2 }
  ]
  constructor(public _matDialog: MatDialog, private _service: InternationalTransferRequestsService, injector: Injector) {
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
  updateGrid(response): void {
    this.dataSource.data = response.data; 
    // this.dataSource.paginator = this.paginator;
    this.paginator = response.pagination;
  }
  getData = () => {
    // this._service
    // .getInternationalTransfers().pipe().subscribe(
    //   (response) => {
    // this.internationalTransfers = this.response.data;
    this.updateGrid(this.response);
    //   },
    //   (response) => super.onError(response)
    // );
  }
  search() {

  }

  openDialogStatus(data): void {
    const dialogRef = this._matDialog
      .open(DialogInternationalTransferStatusComponent, {
        data: data,
        width: '40vw',
        disableClose: true,
        hasBackdrop: true,
        panelClass: 'custom-dialog-container'
      });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
      }
    });
  }
  response = {
    pagination: { total: 451, pages: 19, pageSize: 25, page: 1 },
    data: [
      {
        date: '2021-02-17T06:08:24.403Z',
        accountNo: 'XXXXXXXXX',
        customerName: 'XXXXXXXXX',
        accountCurrency: 'BHD',
        localAmount: '10',
        exRate: '1',
        beneficiary: 'XXXXXXXXX',
        beneficiaryName: 'RAMEEZ',
        beneficiaryBank: 'STANDARD CHARTERED',
        transferCurrency: 'BHD',
        transferAmount: '10',
        status: 'pending'
      },
      {
        date: '2021-02-17T06:08:24.403Z',
        accountNo: 'XXXXXXXXX',
        customerName: 'XXXXXXXXX',
        accountCurrency: 'BHD',
        localAmount: '10',
        exRate: '1',
        beneficiary: 'XXXXXXXXX',
        beneficiaryName: 'RAMEEZ',
        beneficiaryBank: 'STANDARD CHARTERED',
        transferCurrency: 'BHD',
        transferAmount: '10',
        status: 'pending'
      },
      {
        date: '2021-02-17T06:08:24.403Z',
        accountNo: 'XXXXXXXXX',
        customerName: 'XXXXXXXXX',
        accountCurrency: 'BHD',
        localAmount: '10',
        exRate: '1',
        beneficiary: 'XXXXXXXXX',
        beneficiaryName: 'RAMEEZ',
        beneficiaryBank: 'STANDARD CHARTERED',
        transferCurrency: 'BHD',
        transferAmount: '10',
        status: 'pending'
      },
      {
        date: '2021-02-17T06:08:24.403Z',
        accountNo: 'XXXXXXXXX',
        customerName: 'XXXXXXXXX',
        accountCurrency: 'BHD',
        localAmount: '10',
        exRate: '1',
        beneficiary: 'XXXXXXXXX',
        beneficiaryName: 'RAMEEZ',
        beneficiaryBank: 'STANDARD CHARTERED',
        transferCurrency: 'BHD',
        transferAmount: '10',
        status: 'pending'
      },
      {
        date: '2021-02-17T06:08:24.403Z',
        accountNo: 'XXXXXXXXX',
        customerName: 'XXXXXXXXX',
        accountCurrency: 'BHD',
        localAmount: '10',
        exRate: '1',
        beneficiary: 'XXXXXXXXX',
        beneficiaryName: 'RAMEEZ',
        beneficiaryBank: 'STANDARD CHARTERED',
        transferCurrency: 'BHD',
        transferAmount: '10',
        status: 'pending'
      },
      {
        date: '2021-02-17T06:08:24.403Z',
        accountNo: 'XXXXXXXXX',
        customerName: 'XXXXXXXXX',
        accountCurrency: 'BHD',
        localAmount: '10',
        exRate: '1',
        beneficiary: 'XXXXXXXXX',
        beneficiaryName: 'RAMEEZ',
        beneficiaryBank: 'STANDARD CHARTERED',
        transferCurrency: 'BHD',
        transferAmount: '10',
        status: 'pending'
      },
      {
        date: '2021-02-17T06:08:24.403Z',
        accountNo: 'XXXXXXXXX',
        customerName: 'XXXXXXXXX',
        accountCurrency: 'BHD',
        localAmount: '10',
        exRate: '1',
        beneficiary: 'XXXXXXXXX',
        beneficiaryName: 'RAMEEZ',
        beneficiaryBank: 'STANDARD CHARTERED',
        transferCurrency: 'BHD',
        transferAmount: '10',
        status: 'pending'
      },
      {
        date: '2021-02-17T06:08:24.403Z',
        accountNo: 'XXXXXXXXX',
        customerName: 'XXXXXXXXX',
        accountCurrency: 'BHD',
        localAmount: '10',
        exRate: '1',
        beneficiary: 'XXXXXXXXX',
        beneficiaryName: 'RAMEEZ',
        beneficiaryBank: 'STANDARD CHARTERED',
        transferCurrency: 'BHD',
        transferAmount: '10',
        status: 'pending'
      },
      {
        date: '2021-02-17T06:08:24.403Z',
        accountNo: 'XXXXXXXXX',
        customerName: 'XXXXXXXXX',
        accountCurrency: 'BHD',
        localAmount: '10',
        exRate: '1',
        beneficiary: 'XXXXXXXXX',
        beneficiaryName: 'RAMEEZ',
        beneficiaryBank: 'STANDARD CHARTERED',
        transferCurrency: 'BHD',
        transferAmount: '10',
        status: 'pending'
      },
      {
        date: '2021-02-17T06:08:24.403Z',
        accountNo: 'XXXXXXXXX',
        customerName: 'XXXXXXXXX',
        accountCurrency: 'BHD',
        localAmount: '10',
        exRate: '1',
        beneficiary: 'XXXXXXXXX',
        beneficiaryName: 'RAMEEZ',
        beneficiaryBank: 'STANDARD CHARTERED',
        transferCurrency: 'BHD',
        transferAmount: '10',
        status: 'pending'
      },
      {
        date: '2021-02-17T06:08:24.403Z',
        accountNo: 'XXXXXXXXX',
        customerName: 'XXXXXXXXX',
        accountCurrency: 'BHD',
        localAmount: '10',
        exRate: '1',
        beneficiary: 'XXXXXXXXX',
        beneficiaryName: 'RAMEEZ',
        beneficiaryBank: 'STANDARD CHARTERED',
        transferCurrency: 'BHD',
        transferAmount: '10',
        status: 'pending'
      }
    ]
  }
}
