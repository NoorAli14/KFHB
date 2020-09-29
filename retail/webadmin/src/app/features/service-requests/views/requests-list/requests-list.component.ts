import { BaseComponent } from '@shared/components/base/base.component';
import { CONFIG } from '../../../../config';
import { Component, OnInit, ViewEncapsulation, ViewChild, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import {  ServiceRequests } from '@feature/service-requests/models/service-requests.model';
import { MESSAGES } from '@shared/constants/messages.constant';
import { ServiceRequestsService } from '@feature/service-requests/services/sercice-reuests.service';
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
  serviceRequests : ServiceRequests[];
  returnUrl: string;
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

  constructor(public _matDialog: MatDialog, injector: Injector ,
    private _serviceRequestsService: ServiceRequestsService, 
   private route: ActivatedRoute,private router: Router,

    ) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData();
    this.username = new FormControl('');
    this.initSearch();
  }

  getData() {
    this._serviceRequestsService.getServiceRequests().subscribe(
        (response) => {
            this.serviceRequests = response;
            this.updateGrid(this.serviceRequests);
        },
        (error) => {
            console.log(error);
        }
    );
}
onDetail(id): void {
  this._serviceRequestsService.getServiceRequestsById(id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
          (response) => {
            this.router.navigateByUrl(
              this.returnUrl ? this.returnUrl : "/req/details/"+id
          );
          },
          (response) => super.onError(response)
      );
}


  initSearch(): void {
    this.username.valueChanges.subscribe((text: string) => {
    });
  }
  camelToSnakeCase(text): void {
    return camelToSnakeCaseText(text);
  }
  camelToSentenceCase(text): void {
    return camelToSentenceCase(text);
  }
  confirmDialog(type, id): void {
    const message = type === 'invite' ? removeRandom(MESSAGES.RESEND_INVITE()) : removeRandom(MESSAGES.REMOVE_CONFIRMATION());
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
      data: dialogData,
      disableClose: true,
      panelClass: 'app-confirm-dialog',
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe((status) => {
      if (status) {
        //   type === 'invite' ? this.resendInvitation(id) : this.deleteUser(id)
      }
    });
  }


  updateGrid(data): void {
    this.dataSource.data = data.data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
