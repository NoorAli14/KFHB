import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleModuleFormComponent } from '../role-module-form/role-module-form.component';
import { ConfigMiddlewareService } from '../../services/config-middleware.service';
import { RoleModulePermission, Permission } from '@feature/entitlement/models/config.model';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-manage-permission-form',
  templateUrl: './manage-permission-form.component.html',
  styleUrls: ['./manage-permission-form.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class ManagePermissionFormComponent implements OnInit {
  managePermissionForm: FormGroup;
  permissions: Permission[];
  constructor(
      public matDialogRef: MatDialogRef<RoleModuleFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _service: ConfigMiddlewareService
  ) {}

  ngOnInit(): void {
      this.managePermissionForm = new FormGroup({
          roleModuleId: new FormControl(this.data.roleModuleId, [Validators.required]),
          permissionId: new FormControl('', [
              Validators.required,
          ]),
      });
      this.permissions= this.data.permissions;
  }
  onSubmit() {
      this.matDialogRef.close({ data: this.managePermissionForm.value });
  }

}
