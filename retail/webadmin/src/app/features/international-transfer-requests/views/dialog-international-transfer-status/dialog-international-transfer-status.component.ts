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
    this._service.approve(this.data.id);
  }

  approve(): void {
    this._service.reject(this.data.id);
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form)
    }
  }

}
