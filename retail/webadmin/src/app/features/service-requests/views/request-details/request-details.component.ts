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
  serviceRequests: ServiceRequests[];
  displayedColumns = [
    'title',
    'viewUpload&DownloadPDF',
  ];
  documents = [];
  contentType: string;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  status: any;
  serviceRequestForm: FormGroup;
  btnDisable = false;
  comments: any;
  letterType: any;
  requestType: any;
  customerRIM: any;
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
        this.serviceRequests = response.data;
        this.status = response.data.status;
        this.letterType = response.data.letterType;
        this.requestType = response.data.requestType;
        this.customerRIM = response.data.customerRim;
        const responseDocument = response.data.documents;
        for (let i = 0; i < responseDocument.length; i++) {
          this.documents.push(responseDocument[i])
        }
        console.log(this.documents);
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
          this.status = status;
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
  downlaodReport(data,extention): void {
    this.checkType(extention);
    const date = new Date();
    const linkSource = 'data:' + this.contentType + ',' + data;
    const downloadLink = document.createElement('a');
    const fileName = 'ServiceRequest' + date.getDate() + '.' + date.getMonth() + 1 + '.' + date.getFullYear() + '.' + extention;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();

  }
  viewDocument(data,extention): void {
    this.checkType(extention)
    var byteCharacters = atob(data);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    console.log(byteNumbers);
    var file = new Blob([byteArray], { type: this.contentType });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }

  checkType(extention): void {
    let lowerExtention = extention.toLowerCase();
    if (lowerExtention === 'png' || lowerExtention === 'jpg' || lowerExtention === 'jpeg' || lowerExtention === 'gif'
      || lowerExtention === 'tiff' || lowerExtention === 'webp' || lowerExtention === 'bmp' || lowerExtention === 'jpe'
      || lowerExtention === 'jif' || lowerExtention === 'jfif' || lowerExtention === 'jfi' || lowerExtention === 'tif'
      || lowerExtention === 'heif' || lowerExtention === 'heic') {
      this.contentType = 'image/' + extention + ';base64'
    }
    else {
      this.contentType = 'application/' + extention + ';base64';
    }
  }
}
