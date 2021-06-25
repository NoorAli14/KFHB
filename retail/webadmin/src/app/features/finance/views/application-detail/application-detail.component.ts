import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinanceService } from '@feature/finance/services/finance.service';
import { fuseAnimations } from '@fuse/animations';
import { BaseComponent } from '@shared/components/base/base.component';
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
          this.application = response.data;
        },
        (response) => super.onError(response))
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
