import { SettingService } from "./../../setting.service";
import { Component, OnInit, ViewEncapsulation, Injector } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { UpdateProfileComponent } from "@feature/setting/components/update-profile/update-profile.component";
import { User } from "@feature/entitlement/models/user.model";
import { MESSAGES } from "@shared/constants/app.constants";
import { camelToSnakeCase } from "@shared/helpers/global.helper";
import { BaseComponent } from "@shared/components/base/base.component";
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ProfileComponent extends BaseComponent implements OnInit {
    dialogRef: any;

    currentUser: any;
    constructor(
        public _matDialog: MatDialog,
        private _settingService: SettingService ,
        injector: Injector
        ) {
            super(injector);
    }

    ngOnInit(): void {
        this.currentUser = this._authUserService.User;
    }
    openDialog(): void {
        const _this = this;
        this.dialogRef = this._matDialog
            .open(UpdateProfileComponent, {
                data: this.currentUser,
                panelClass: "app-update-profile",
                disableClose: true,
                hasBackdrop: true,
            })
            .componentInstance.sendResponse.subscribe((response) => {
                _this.onUpdateProfile(response);
            });
    }

    onUpdateProfile(data) {
        data = camelToSnakeCase(data);
        this._settingService.updateProfile(data)  .pipe(takeUntil(this._unsubscribeAll)).subscribe(
            (response: User) => {
                this._authUserService.User = response;
                this.currentUser = this._authUserService.User;
                this.errorType = "success";
                this.responseMessage = MESSAGES.UPDATED("Profile");
                this._matDialog.closeAll();
            },
            (response) => super.onError(response)
        );
    }
}
