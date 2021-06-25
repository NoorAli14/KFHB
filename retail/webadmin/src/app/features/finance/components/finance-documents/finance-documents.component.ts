import { Component, Injector, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CONFIG } from '@config/index';
import { FinanceService } from '@feature/finance/services/finance.service';
import { fuseAnimations } from '@fuse/animations';
import { BaseComponent } from '@shared/components/base/base.component';
import { MatSortDirection } from '@shared/enums/app.enum';
import { camelToSentenceCase } from '@shared/helpers/global.helper';
import { Pagination } from '@shared/models/pagination.model';
import { EventEmitter } from 'events';
import { takeUntil } from 'rxjs/operators';
import { PreviewDocumentComponent } from '../preview-document/preview-document.component';

@Component({
  selector: 'app-finance-documents',
  templateUrl: './finance-documents.component.html',
  styleUrls: ['./finance-documents.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class FinanceDocumentsComponent extends BaseComponent implements OnInit {
  @Input() documents: any[];
  @Input() applicationId: string;
  @Output() preview: EventEmitter=new EventEmitter();
  pageSize: number = CONFIG.PAGE_SIZE;
  pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
  nationalities: any[];
  displayedColumns = ['name', 'action',];
  pagination: Pagination;
  dialogRef: any;

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  previousFilterState: MatSortDirection;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(
    public _matDialog: MatDialog,
    private _service: FinanceService,
    injector: Injector
  ) {
    super(injector);
    super.ngOnInit();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.documents);
  }
  camelToSentenceCase(text): string {
    return camelToSentenceCase(text);
  }

  onPreview(id): void {
    this._service
      .getDocumentById(this.applicationId,id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (response) => {
          this.dialogRef = this._matDialog.open(PreviewDocumentComponent, {
            data: response.data[0],
            panelClass: 'app-preview-document',
          });
        },
        (response) => super.onError(response))
  }
}
