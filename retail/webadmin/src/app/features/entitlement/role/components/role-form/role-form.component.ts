import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from '@feature/entitlement/models/role.model';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls    : ['./role-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RoleFormComponent implements OnInit {

   roleForm: FormGroup;
    constructor(public matDialogRef: MatDialogRef<RoleFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Role) {
    }

    ngOnInit(): void {
        this.roleForm = new FormGroup({
            id: new FormControl(this.data.id),
            name: new FormControl(this.data.name, [Validators.required]),
            status: new FormControl(this.data.status, [Validators.required]),
            description: new FormControl(this.data.description, [Validators.required]),
        });
    }
    onSubmit() {
        this.matDialogRef.close({data: this.roleForm.value});
    }
}
