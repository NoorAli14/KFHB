import { Component, Injector, Input, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FinanceService } from '@feature/finance/services/finance.service';
import { fuseAnimations } from '@fuse/animations';
import { BaseComponent } from '@shared/components/base/base.component';
import { camelToSentenceCase, snakeToCamelArray } from '@shared/helpers/global.helper';
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
  @Output() preview: EventEmitter = new EventEmitter();
  displayedColumns = ['name', 'action',];
  dialogRef: any;

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  constructor(
    public _matDialog: MatDialog,
    private _service: FinanceService,
    injector: Injector
  ) {
    super(injector);
    super.ngOnInit();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.documents.previousValue != changes.documents.currentValue) {
      const docs = snakeToCamelArray(this.documents)
      this.dataSource = new MatTableDataSource(docs);
    }
  }

  camelToSentenceCase(text): string {
    return camelToSentenceCase(text);
  }

  onPreview(id): void {
    this._service
      .getDocumentById({ applicationId: this.applicationId, documentId: id })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (response) => {
          const data = snakeToCamelArray(response.data)
          this.dialogRef = this._matDialog.open(PreviewDocumentComponent, {
            data: data[0],
            panelClass: 'app-preview-document',
          });
        },
        (response) => super.onError(response))
  }
}
