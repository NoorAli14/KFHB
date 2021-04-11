import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InternationalTransferRequestsService } from '@feature/international-transfer-requests/services/international-transfer-requests.service';

@Component({
  selector: 'app-international-transfer-report',
  templateUrl: './international-transfer-report.component.html',
  styleUrls: ['./international-transfer-report.component.scss']
})
export class InternationalTransferReportComponent implements OnInit {

  transferDetail = {
    date: '01/20/2019',
    requestId: '2721ce25-d2fb-4c-a66e-dd62650ab2af',
    customerName: 'ASHAR MASOOD NAZIM',
    rimNo: '107244',
    accNo: '602000000741',
    localAmount: '2000',
    amountCurrency: 'BHD',
    exchangeRate: '1',
    beneficiaryName: 'Ali',
    beneficiaryIBAN: 'PK05ALFH5518005000952179',
    transferCurrency: 'BHD',
    transferAmount: '20000',
    beneficiaryBankName: 'Test bank',
    BeneficiaryBankSWIFT: 'Test1234',
    BeneficiaryBICSortCode: 'Beneficiary',
    Address: 'Abc road 1234',
    beneficiaryCountry: 'PK',
    ChargesType: 'OUR',
    purposeOfTranfer: 'Test fh'
  }

  constructor(private route: ActivatedRoute, private _tranferRequestService: InternationalTransferRequestsService,) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      // this.getData(param.id);
    })
  }

  // getData(id) {
  //   this._tranferRequestService.getInternationalTransferReportById(id).subscribe(
  //     (response) => {
  //       console.log(response)
  //     },
  //     (error) => {
  //     }
  //   );
  // }
}
