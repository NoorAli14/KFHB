import { BaseComponent } from '@shared/components/base/base.component';
import { CONFIG } from '../../../../config';
import { Component, OnInit, ViewEncapsulation, ViewChild, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { ServiceRequests } from '@feature/service-requests/models/service-requests.model';
import { MESSAGES } from '@shared/constants/messages.constant';
import { ServiceRequestsService } from '@feature/service-requests/services/service-requests.service';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { takeUntil } from "rxjs/operators";
import { MatSort } from '@angular/material/sort';
import {
  camelToSentenceCase,
  camelToSnakeCaseText,
  snakeToCamelObject,
  removeRandom,
} from '@shared/helpers/global.helper';
import {
  ConfirmDialogModel,
  ConfirmDialogComponent,
} from '@shared/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class RequestsListComponent extends BaseComponent implements OnInit {
  dialogRef: any;
  userPermissions: any[];
  username: FormControl;
  pageSize: number = CONFIG.PAGE_SIZE;
  pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
  serviceRequests: ServiceRequests[];
  returnUrl: string;
  id;
  displayedColumns = [
    'requestType',
    'customerRim',
    'customerMobile',
    'customerEmail',
    'requestDate',
    'status',
    'actions'
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(public _matDialog: MatDialog, injector: Injector, private _service: ServiceRequestsService, private route: ActivatedRoute, private router: Router,
  ) {
    super(injector);
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.getData();
    this.id = setInterval(() => {
      console.log('call to the server  at:'+ new Date())
      this.getData();
    }, 300000);
    
  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
  getData = () => {
    this._service.getServiceRequests().subscribe(
      (response) => {
        this.serviceRequests = response;
        this.updateGrid(this.serviceRequests);
      },
      (error) => {
      }
    );
  }
  onDetail(id): void {
    this._service.getServiceRequestsById(id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (response) => {
          this.router.navigateByUrl(
            this.returnUrl ? this.returnUrl : '/req/details/' + id
          );
        },
        (response) => super.onError(response)
      );
  }
  camelToSnakeCase(text): void {
    return camelToSnakeCaseText(text);
  }
  camelToSentenceCase(text): void {
    return camelToSentenceCase(text);
  }
  updateGrid(data): void {
    this.dataSource.data = data.data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  downloadReport = () => {
    this._service
      .getServiceRequestReport().pipe().subscribe(
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
    const fileName = 'Service_Requests_Report_' + date.getDate() + '.' + date.getMonth() + 1 + '.' + date.getFullYear() + '.xlsx';
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

}
