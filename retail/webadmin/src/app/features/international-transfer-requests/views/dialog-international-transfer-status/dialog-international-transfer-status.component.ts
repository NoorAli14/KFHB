import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InternationalTransferRequest } from '@feature/international-transfer-requests/models/transfer-request.model';
import { InternationalTransferRequestsService } from '@feature/international-transfer-requests/services/international-transfer-requests.service';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-dialog-international-transfer-status',
  templateUrl: './dialog-international-transfer-status.component.html',
  styleUrls: ['./dialog-international-transfer-status.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class DialogInternationalTransferStatusComponent implements OnInit {

  form = new FormGroup({
    // id: new FormControl('', [Validators.required]),
    comments: new FormControl('', [Validators.required]),
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: InternationalTransferRequest, 
  private dialogRef: MatDialogRef<DialogInternationalTransferStatusComponent>,
  private _service: InternationalTransferRequestsService) { }

  ngOnInit(): void {
    
  }

  reject() : void {
    this._service.reject({bank_trx_ref_no: this.data.bank_trx_ref_no});
  }

  approve(): void {
    const obj = {
      // bank_code: this.data.bank_code,
      // benifitiary_bank_name: this.data.beneficiary_bank_name,
      // reference_number:"01800730000059069990",
      // transaction_currency_code:"USD",
      // transfer_amount: "69600.00",
      // sender_iban_no: "/BH32KFHO00991010002083",
      // sender_name: "FRENCH HOUSE DESIGN W.L.L.",
      // sender_address: "FLAT 11,BLDG 63 ,ROAD 1, BLOCK 604",
      // sender_po_box: "Sender PO Box",
      // benifitiary_swift_code: "MEDLLBBX",
      // beneficiary_account_no: "/SA9480000121608010502338",
      // beneficiary_name: "MOSAIQUE S.A.L",
      // beneficiary_charges_type:"OUR",
      // phoenix_reference_no:"GA800740000062169718",
      // bank_trx_ref_no:"REF@1234"
  }
    this._service.approve(obj);
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form)
    }
  }

}
