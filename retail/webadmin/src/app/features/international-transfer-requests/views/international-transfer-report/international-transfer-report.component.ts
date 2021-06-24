import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { InternationalTransferRequest } from '@feature/international-transfer-requests/models/transfer-request.model';
import { InternationalTransferRequestsService } from '@feature/international-transfer-requests/services/international-transfer-requests.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-international-transfer-report',
    templateUrl: './international-transfer-report.component.html',
    styleUrls: ['./international-transfer-report.component.scss']
})
export class InternationalTransferReportComponent implements OnInit, OnDestroy {

    constructor(private _activatedRoute: ActivatedRoute, private _service: InternationalTransferRequestsService,) { }

    transferDetail: InternationalTransferRequest;
    listSub: Subscription;
    dataId: string;

    ngOnInit(): void {
        this._activatedRoute.params.forEach((params: Params) => {
            this.dataId = params['id'];
        });
        this.listSub = this._service.transferRequestList.subscribe(resp => {
            this.transferDetail = resp.filter(x => x.id == this.dataId)[0];
        });
    }

    ngOnDestroy(): void {
        this.listSub.unsubscribe();
    }
}



    //   transferDetail = {
    //     date: '01/20/2019',
    //     requestId: '2721ce25-d2fb-4c-a66e-dd62650ab2af',
    //     customerName: 'ASHAR MASOOD NAZIM',
    //     rimNo: '107244',
    //     accNo: '602000000741',
    //     localAmount: '2000',
    //     amountCurrency: 'BHD',
    //     exchangeRate: '1',
    //     beneficiaryName: 'Ali',
    //     beneficiaryIBAN: 'PK05ALFH5518005000952179',
    //     transferCurrency: 'BHD',
    //     transferAmount: '20000',
    //     beneficiaryBankName: 'Test bank',
    //     BeneficiaryBankSWIFT: 'Test1234',
    //     BeneficiaryBICSortCode: 'Beneficiary',
    //     Address: 'Abc road 1234',
    //     beneficiaryCountry: 'PK',
    //     ChargesType: 'OUR',
    //     purposeOfTranfer: 'Test fh'
    //   }



