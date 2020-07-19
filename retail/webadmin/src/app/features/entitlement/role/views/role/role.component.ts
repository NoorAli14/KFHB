import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { RoleFormComponent } from "@feature/entitlement/role/components/role-form/role-form.component";
import { Role } from '@feature/entitlement/role/role.model';

@Component({
    selector: "app-role",
    templateUrl: "./role.component.html",
    styleUrls: ["./role.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class RoleComponent implements OnInit {
    dialogRef: any;
    constructor(public _matDialog: MatDialog) {}

    ngOnInit(): void {}

    onCreateDialog(): void {
        this.dialogRef = this._matDialog.open(RoleFormComponent, {
            data: new Role(),
            panelClass: "app-role-form",
        });
    }
}
