import { BaseComponent } from '@shared/components/base/base.component';
import { CONFIG } from '../../../../config';
import { Component, OnInit, ViewEncapsulation, ViewChild, Input, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { ServiceRequests } from '@feature/service-requests/models/service-requests.model';
import { MESSAGES } from '@shared/constants/messages.constant';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from "rxjs/operators";
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
import { ServiceRequestsService } from '@feature/service-requests/services/sercice-reuests.service';
@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class RequestDetailsComponent extends BaseComponent implements OnInit {
  dialogRef: any;
  id: string;
  userPermissions: any[];
  username: FormControl;
  pageSize: number = CONFIG.PAGE_SIZE;
  pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
  serviceRequests: ServiceRequests[];
  displayedColumns = [
    'Document Name',
    'View Upload & Download PDF',
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  status: any;
  serviceRequestForm: FormGroup;
  btnDisable = false;
  comments: any;
  letterType: any;
  requestType: any;
  constructor(public _matDialog: MatDialog, injector: Injector,
    private _serviceRequestsService: ServiceRequestsService,
    private activatedRoute: ActivatedRoute) {
    super(injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.activatedRoute.params.subscribe(paramsId => {
      this.id = paramsId.id;
    });
    this.getData();
    this.serviceRequestForm = new FormGroup({
      comments: new FormControl('', []),
    });
    this.username = new FormControl('');
    this.initSearch();
  }
  getData = () => {
    this._serviceRequestsService.getServiceRequestsById(this.id).subscribe(
      (response) => {
        this.serviceRequests = response.data;
        this.status = response.data.status;
        this.letterType = response.data.letterType;
        this.requestType = response.data.requestType;
        if (response.data.status != 'Pending') {
          this.btnDisable = true;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updateStatus = (status) => {
    const data = JSON.stringify({
      id: this.id,
      status: status,
      comments: this.serviceRequestForm.value.comments,
      type: null
    });
    this._serviceRequestsService
      .updateStatus(data)
      .pipe()
      .subscribe(
        (response) => {

          this.status = status;
          this.btnDisable = true;
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
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
