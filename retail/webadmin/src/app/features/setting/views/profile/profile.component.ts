import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileComponent } from '@feature/setting/components/update-profile/update-profile.component';
import { User } from '@feature/entitlement/models/user.model';

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ProfileComponent implements OnInit {
    dialogRef: any;

    constructor( public _matDialog: MatDialog,) {}

    ngOnInit(): void {}
    onUpdate(): void {
        const user = new User();
        this.dialogRef = this._matDialog.open(UpdateProfileComponent, {
            data: user,
            panelClass: "app-update-profile",
            disableClose: true,
            hasBackdrop: true,
        });
        this.dialogRef.afterClosed().subscribe((response) => {
        });
    }
}
