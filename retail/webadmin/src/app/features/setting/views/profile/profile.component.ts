import { EventBusService } from "./../../../../core/services/event-bus/event-bus.service";
import { AuthUserService } from "./../../../../core/services/user/auth-user.service";
import { SettingService } from "./../../setting.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { UpdateProfileComponent } from "@feature/setting/components/update-profile/update-profile.component";
import { User } from "@feature/entitlement/models/user.model";
import { MESSAGES } from "@shared/constants/app.constants";
import { UnsubscribeOnDestroyAdapter } from "@shared/models/unsubscribe-adapter.model";
import { Events } from "@shared/enums/events.enum";
import { camelToSnakeCase } from '@shared/helpers/global.helper';

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ProfileComponent implements OnInit {
    dialogRef: any;
    message: string = "";
    type: string = "";
    currentUser: any;
    constructor(
        public _matDialog: MatDialog,
        private _settingService: SettingService,
        private _authUserService: AuthUserService
    ) {}

    ngOnInit(): void {
        this.currentUser = this._authUserService.User;
    }
    openDialoge(): void {
        const _this = this;
        const user = new User();
        this.dialogRef = this._matDialog
            .open(UpdateProfileComponent, {
                data:  this.currentUser ,
                panelClass: "app-update-profile",
                disableClose: true,
                hasBackdrop: true,
            })
            .componentInstance.sendResponse.subscribe((response) => {
                _this.onUpdatProfile(response);
            });
    }

    onUpdatProfile(data) {
        data= camelToSnakeCase(data);
        this._settingService.updateProfile(data).subscribe(
            (response: User) => {
                this._authUserService.User=response;
                this.currentUser=this._authUserService.User;
                this.type = "success";
                this.message = MESSAGES.UPDATED("Profile");
                this._matDialog.closeAll();
            },
            () => {
                this.type = "error";
                this.message = MESSAGES.UNKNOWN;
            }
        );
    }
}
