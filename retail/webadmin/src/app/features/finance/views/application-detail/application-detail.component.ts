import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FinanceService } from '@feature/finance/services/finance.service';
import { fuseAnimations } from '@fuse/animations';
import { BaseComponent } from '@shared/components/base/base.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { snakeToCamelObject } from '@shared/helpers/global.helper';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class ApplicationDetailComponent extends BaseComponent implements OnInit {
  application: any = {};
  id: number;
  private sub: any;

  constructor(private _service: FinanceService,
    private route: ActivatedRoute,
    public _matDialog: MatDialog,
    injector: Injector
  ) {
    super(injector);
    super.ngOnInit();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.getApplication(this.id)
    });
  }

  getApplication(id): void {
    this._service
      .getApplicationsById(id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        (response) => {
          const data = snakeToCamelObject(response.data);
          this.application = data;
        },
        (response) => super.onError(response))
  }

  openDialog() {
    const message = `Are you sure?`
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
      data: dialogData,
      disableClose: true,
      panelClass: "app-confirm-dialog",
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe((status) => {
      if (status) {
      }
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
