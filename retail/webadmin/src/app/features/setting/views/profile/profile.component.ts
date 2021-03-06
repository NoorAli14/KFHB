import { SettingService } from './../../setting.service';
import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileComponent } from '@feature/setting/components/update-profile/update-profile.component';
import { User } from '@feature/entitlement/models/user.model';
import { camelToSnakeCase } from '@shared/helpers/global.helper';
import { BaseComponent } from '@shared/components/base/base.component';
import { takeUntil } from 'rxjs/operators';
import { MESSAGES } from '@shared/constants/messages.constant';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ProfileComponent extends BaseComponent implements OnInit {
    dialogRef: any;

    currentUser: any;
    nationalities: any[];
    constructor(
        public _matDialog: MatDialog,
        private _settingService: SettingService,
        injector: Injector
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.currentUser = this._authUserService.User;
        this.getData();
    }
    openDialog(): void {
        const _this = this;
        this.dialogRef = this._matDialog
            .open(UpdateProfileComponent, {
                data: {
                    user: this.currentUser,
                    nationalities: this.nationalities,
                },
                panelClass: 'app-update-profile',
                disableClose: true,
                hasBackdrop: true,
            })
            .componentInstance.sendResponse.subscribe((response) => {
                _this.onUpdateProfile(response);
            });
    }
    getData(): void {
        this._settingService
            .getNationalities()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    this.nationalities = response;
                },
                (response) => super.onError(response))
    }
    onUpdateProfile(data): void {
        data = camelToSnakeCase(data);
        this._settingService
            .updateProfile(data)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response: User) => {
                    this._authUserService.User = response;
                    this.currentUser = this._authUserService.User;
                    this._matDialog.closeAll();
                    this._notifier.success( MESSAGES.UPDATED('Profile'));
                },
                (response) => super.onError(response))
    }
    onUpdatePassword(data): void {
        this._settingService
            .updatePassword(data)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    if (response.status === 'FAILED'){
                        this._notifier.error(response.message);
                    }else{
                        this._notifier.success( MESSAGES.UPDATED('Password'));
                    }
                },
                (response) => super.onError(response))
    }
}
