
import { Component, OnInit, ViewEncapsulation, ViewChild, Injector, OnDestroy } from '@angular/core';
import { BaseComponent } from '@shared/components/base/base.component';
import { CONFIG } from '../../../../config';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
    camelToSentenceCase,
    camelToSnakeCaseText,
    snakeToSentenceCase,
} from '@shared/helpers/global.helper';
import { InternationalTransferRequestsService } from '@feature/international-transfer-requests/services/international-transfer-requests.service';
import { DialogInternationalTransferStatusComponent } from '../dialog-international-transfer-status/dialog-international-transfer-status.component';
import { InternationalTransferRequest } from '@feature/international-transfer-requests/models/transfer-request.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
// import { Referral } from '../model/referral.model';


@Component({
    selector: 'app-international-transfer-requests',
    templateUrl: './international-transfer-requests.component.html',
    styleUrls: ['./international-transfer-requests.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class InternationalTransferRequestsComponent extends BaseComponent implements OnInit, OnDestroy {

    internationalTransfers: InternationalTransferRequest[] = [];
    username: FormControl;
    pageSize: number = CONFIG.PAGE_SIZE;
    pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
    currentPage: number = 0;
    recordCount: number = 0;

    listSub: Subscription;

    displayedColumns = [
        'system_date_time',
        'from_account_id',
        'customer_name',
        'from_currency_id',
        'amount',
        'ex_rate',
        'to_account_id',
        'to_full_name',
        'to_bank_code',
        'to_currency_id',
        'local_eq',
        'status',
        'action'
    ];

    public displayColumnsHeader = {
        'system_date_time': 'Date',
        'from_account_id': 'Account No.',
        'customer_name': 'Customer Name',
        'from_currency_id': 'Account Currency',
        'local_eq': 'Local Amount',
        'ex_rate': 'Ex. Rate',
        'to_account_id': 'Beneficiary',
        'to_full_name': 'Beneficiary Name',
        'to_bank_code': 'Beneficiary Bank',
        'to_currency_id': 'Transfer Currency',
        'amount': 'Transfer Amount',
        'status': 'Status',
        'action': ' '
    }

    dataSource: MatTableDataSource<InternationalTransferRequest> =
        new MatTableDataSource<InternationalTransferRequest>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    searchForm = new FormGroup({
        fromDate: new FormControl(''),
        toDate: new FormControl(''),
        status: new FormControl(''),
    })

    statusDropdown = [
        { text: 'Pending', value: 'P' },
        { text: 'Completed', value: 'C' },
        { text: 'Approved', value: 'A' }
    ]

    constructor(public _matDialog: MatDialog,
        private _service: InternationalTransferRequestsService,
        injector: Injector,
        private router: Router) {
        super(injector);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.getData();

        this.listSub = this._service.transferRequestList.subscribe(
            (resp) => {
                this.internationalTransfers = resp;
            }
        )
    }

    // openWithId(event): void {
    //     debugger;
    //     this.router.navigate(['/international-transfer-requests/report/:id', { id: event.id }])
    // }

    camelToSnakeCase(text): void {
        return camelToSnakeCaseText(text);
    }
    camelToSentenceCase(text): void {
        return camelToSentenceCase(text);
    }

    snakeToSentenceCase(text) {
        return snakeToSentenceCase(text);
    }

    updateGrid(response): void {
        debugger;
        this.dataSource = new MatTableDataSource(response.data.records);
        this.dataSource.paginator = this.paginator;
        this.pageSize = response.data.pageSize;
    }


    getData = () => {
        debugger;
        const status = this.searchForm.value.status;
        const fromDate = this.searchForm.value.fromDate ? this.searchForm.value.fromDate.toISOString() : ''
        const toDate = this.searchForm.value.toDate ? this.searchForm.value.toDate.toISOString() : ''

        let params = {};
        if (status) {
            params['Status'] = status;
        }
        if (fromDate) {
            params["TransferDateFrom"] = fromDate;
        }
        if (toDate) {
            params["TransferDateTo"] = toDate;
        }

        this._service.getAll(params).pipe().subscribe(
            (resp: any) => {
                this.updateGrid(resp);
            },
            (resp) => super.onError(resp)
        );
    }

    ngOnDestroy(): void {
        this.listSub.unsubscribe();
    }

    search() {
        
        this.getData();

    }

    openDialogStatus(data : InternationalTransferRequest): void {
        const dialogRef = this._matDialog
            .open(DialogInternationalTransferStatusComponent, {
                data: data,
                width: '40vw',
                disableClose: true,
                hasBackdrop: true,
                panelClass: 'custom-dialog-container'
            });
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {

            }
        });
    }

}