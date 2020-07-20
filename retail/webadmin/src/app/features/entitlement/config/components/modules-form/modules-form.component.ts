import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Modules } from '../../../models/modules.model';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-modules-form',
  templateUrl: './modules-form.component.html',
  styleUrls: ['./modules-form.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class ModulesFormComponent implements OnInit {

  modulesForm: FormGroup;
  constructor(public matDialogRef: MatDialogRef<ModulesFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Modules) {
  }

  ngOnInit(): void {
      this.modulesForm = new FormGroup({
          id: new FormControl(this.data.id),
          name: new FormControl(this.data.name, [Validators.required]),
          status: new FormControl(this.data.status, [Validators.required]),
      });
  }
  onSubmit() {
      this.matDialogRef.close({data: this.modulesForm.value});
  }

}
