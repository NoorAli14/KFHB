import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { fuseAnimations } from "@fuse/animations";
import { ConfigMiddlewareService } from "../../services/config-middleware.service";
import { Role } from "@feature/entitlement/models/role.model";
import { Modules } from "@feature/entitlement/models/modules.model";

@Component({
    selector: "app-role-module-form",
    templateUrl: "./role-module-form.component.html",
    styleUrls: ["./role-module-form.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class RoleModuleFormComponent implements OnInit {
    roleModuleForm: FormGroup;
    roles: Role[];
    modules: Modules[];
    constructor(
        public matDialogRef: MatDialogRef<RoleModuleFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _service: ConfigMiddlewareService
    ) {}

    ngOnInit(): void {
        this.roleModuleForm = new FormGroup({
            id: new FormControl(this.data.id),
            roleId: new FormControl(this.data.roleId, [Validators.required]),
            moduleId: new FormControl(this.data.moduleId, [
                Validators.required,
            ]),
        });
        this.modules = this.data.modules;
        this.roles = this.data.roles;
    }
    onSubmit() {
        this.matDialogRef.close({ data: this.roleModuleForm.value });
    }
}
