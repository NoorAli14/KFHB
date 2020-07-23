import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { Role } from "@feature/entitlement/models/role.model";
import { RoleFormComponent } from "../../components/role-form/role-form.component";
import { ConfigMiddlewareService } from "../../services/config-middleware.service";

@Component({
    selector: "app-role",
    templateUrl: "./role.component.html",
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class RoleComponent implements OnInit {
    dialogRef: any;
    roles: Role[];
    message: string = "";
    type: string = "";

    displayedColumns = ["name", "status", "description", "actions"];

    constructor(
        public _matDialog: MatDialog,
        private _service: ConfigMiddlewareService
    ) {}

    ngOnInit(): void {
        this.getData();
    }
  
    onCreateDialog(): void {
        this.dialogRef = this._matDialog.open(RoleFormComponent, {
            panelClass: "app-role-form",
            data:new Role()
        });
    }
    onEditDialog(role): void {
        this.dialogRef = this._matDialog.open(RoleFormComponent, {
            panelClass: "app-role-form",
            data:role
        });
    }
    getData() {
        this._service.getRoles().subscribe(
            (response) => {
                 this.roles = response;
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
