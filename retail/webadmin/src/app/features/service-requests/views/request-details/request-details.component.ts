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
import { takeUntil } from 'rxjs/operators';
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
import { ServiceRequestsService } from '@feature/service-requests/services/service-requests.service';
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
  serviceRequest: ServiceRequests;
  displayedColumns = [
    'title',
    'viewUpload&DownloadPDF',
  ];
  documents = [];
  contentType: string;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  serviceRequestForm: FormGroup;
  btnDisable = false;
  disabled = false;
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
  }
  getData = () => {
    this._serviceRequestsService.getServiceRequestsById(this.id).subscribe(
      (response) => {
        console.log(response);
        this.serviceRequest = {
          id: response.data.id,
          status: response.data.status,
          customerRim: response.data.customerRim,
          date: response.data.created_on,
          comments: response.data.comments,
          letterType: response.data.letterType,
          requestType: response.data.requestType,
          completionLetterType: response.data.completionLetterType,
          result: response.data.result,
          result2: response.data.result,
          documents: response.data.documents,
        };
        this.serviceRequestForm.patchValue({
          comments: response.data.comments
        });
        const responseDocument = response.data.documents;
        for (let i = 0; i < responseDocument.length; i++) {
          this.documents.push(responseDocument[i]);
        }
        this.updateGrid(this.documents);
        if (response.data.status != 'Pending') {
          this.btnDisable = true;
        }
      },
      (error) => {
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
          this.serviceRequest.status = status;
          this.serviceRequest.comments = this.serviceRequestForm.value.comments;
          this.btnDisable = true;
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
  confirmDialog(status): void {
    const message = status === 'Rejected' ? MESSAGES.CHANGE_STATUS('Reject') : MESSAGES.CHANGE_STATUS('Approve');
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
      data: dialogData,
      disableClose: true,
      panelClass: 'app-confirm-dialog',
      hasBackdrop: true,
    });
    dialogRef.afterClosed().subscribe((s) => {
      if (s) {
        this.updateStatus(status);
      }
    });
  }

  updateGrid(data): void {
    this.dataSource.data = data;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  downlaodDocument(data, extention): void {
    this.checkType(extention);
    const date = new Date();
    const linkSource = 'data:' + this.contentType + ',' + data;
    const downloadLink = document.createElement('a');
    const fileName = 'ServiceRequest' + date.getDate() + '.' + date.getMonth() + 1 + '.' + date.getFullYear() + extention;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();

  }
  viewDocument(data, extention): void {
    this.checkType(extention)
    var byteCharacters = atob(data);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var file = new Blob([byteArray], { type: this.contentType });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }

  checkType(extention): void {
    if (extention.includes('.')) {
      extention = extention.split('.')[1];
    }
    let lowerExtention = extention.toLowerCase();
    if (lowerExtention === 'png' || lowerExtention === 'jpg' || lowerExtention === 'jpeg') {
      this.contentType = 'image/' + extention + ';base64'
    }
    else {
      this.contentType = 'application/' + extention + ';base64';
    }
  }
}
