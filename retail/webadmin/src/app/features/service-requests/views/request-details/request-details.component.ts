import { BaseComponent } from '@shared/components/base/base.component';
import { CONFIG } from '../../../../config';
import { Component, OnInit, ViewEncapsulation, ViewChild ,Input} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';

import { MESSAGES } from '@shared/constants/app.constants';

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
import {
  ConfirmDialogModel,
  ConfirmDialogComponent,
} from '@shared/components/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class RequestDetailsComponent extends BaseComponent implements OnInit {
  dialogRef: any;
  userPermissions: any[];
  username: FormControl;
  pageSize: number = CONFIG.PAGE_SIZE;
  pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
  displayedColumns = [
    'Document Name',
    'View Upload & Download PDF',
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(public _matDialog: MatDialog) {
    super('Referrals');
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.username = new FormControl('');
    this.initSearch();
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
