import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogInternationalTransferStatusComponent>) { }

  ngOnInit(): void {
    this.data
  }
  onSubmit() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.dialogRef.close(this.form)
    }
  }

}
