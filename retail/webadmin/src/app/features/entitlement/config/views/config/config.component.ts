import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { Modules } from "@feature/entitlement/models/modules.model";
import { RoleModuleFormComponent } from "../../components/role-module-form/role-module-form.component";
import { ConfigMiddlewareService } from "../../services/config-middleware.service";
import { RoleModuleModel } from "@feature/entitlement/models/config.model";
import { Role } from "@feature/entitlement/models/role.model";

@Component({
    selector: "app-config",
    templateUrl: "./config.component.html",
    styleUrls: ["./config.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class ConfigComponent implements OnInit {
    dialogRef: any;
    roles: Role[];
    modules: Modules[];
    roleModulesList: RoleModuleModel[];
    constructor(
        public _matDialog: MatDialog,
        private _service: ConfigMiddlewareService
    ) {}

    ngOnInit(): void {
        this.getData();
    }

    onCreateDialog(): void {
        this.dialogRef = this._matDialog.open(RoleModuleFormComponent, {
            data: {
                roles: this.roles,
                modules: this.modules,
            },
            panelClass: "app-role-module-form",
        });
    }
    getData() {
        this._service.forkConfigData().subscribe(
            (response) => {
                [this.modules, this.roles, this.roleModulesList] = response;
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
