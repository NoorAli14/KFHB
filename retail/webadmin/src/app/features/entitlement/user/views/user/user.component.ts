import { BaseComponent } from '@shared/components/base/base.component';
import { CONFIG } from '@config/index';
import {
    Component,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    Injector,
} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../../components/user-form/user-form.component';

import { UserService } from '../../services/user.service';
import { MODULES } from '@shared/constants/app.constants';

import { FormControl } from '@angular/forms';
import { User } from '@feature/entitlement/models/user.model';
import { Role } from '@feature/entitlement/models/role.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
    camelToSentenceCase,
    camelToSnakeCaseText,
    snakeToCamelObject,
    removeRandom,
} from '@shared/helpers/global.helper';
import {
    ConfirmDialogModel,
    ConfirmDialogComponent,
} from '@shared/components/confirm-dialog/confirm-dialog.component';
import { UserDetailComponent } from '../../components/user-detail/user-detail.component';
import { debounceTime, distinctUntilChanged, map, skip, takeUntil } from 'rxjs/operators';
import { MESSAGES } from '@shared/constants/messages.constant';
import { Pagination } from '@shared/models/pagination.model';
    import * as QueryString from 'query-string';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class UserComponent extends BaseComponent implements OnInit {
    dialogRef: any;
    users: User[];
    roles: Role[];
    userPermissions: any[];
    pageSize: number = CONFIG.PAGE_SIZE;
    pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
    nationalities: any[];
    displayedColumns = ['firstName', 'lastName', 'email', 'createdOn', 'status', 'action'];
    pagination: Pagination;
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    config: object;
    control: FormControl;
    constructor(
        public _matDialog: MatDialog,
        private _service: UserService,
        injector: Injector
    ) {
        super(injector, MODULES.USER_MANAGEMENT);
        super.ngOnInit();
    }

    ngOnInit(): void {
        this.config = this.initParams();
        this.getData(this.config);
        this.pagination = new Pagination();
        this.control=new FormControl();
        this.initSearch();
    }
    initParams(): object{
        return {
            limit: CONFIG.PAGE_SIZE,
            page: 1,
            sort_order: 'desc',
            sort_by: 'created_on',
        };
    }
    getQueryString(params): string {
        return QueryString.stringify(params);
    }

    createQueryObject(params): any {
        return {
            ...this.config,
            ...params,
        };
    }
    getData(params): void {
        const queryParams = QueryString.stringify(
            this.createQueryObject(params)
        );
        this._service
            .forkUserData(queryParams)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    this.users=  response[0].data;
                    this.pagination=response[0].pagination;
                    this.roles= response[1].data;
                    this.nationalities=response[2];
                    this.pagination.page = this.pagination.page - 1;
                    this.dataSource = new MatTableDataSource(this.users);
                },
                (response) => super.onError(response))
    }

    camelToSnakeCase(text): void {
        return camelToSnakeCaseText(text);
    }
    openDialog(data): void {
        const _this = this;
        this.dialogRef = this._matDialog
            .open(UserFormComponent, {
                data: {
                    nationalities: this.nationalities,
                    roles: this.roles,
                    user:
                        data && data.id ? snakeToCamelObject(data) : new User(),
                },
                disableClose: true,
                hasBackdrop: true,
                panelClass: 'app-user-form',
            })
            .componentInstance.sendResponse.subscribe((response) => {
                  if (response.id) {
                    _this.editUser(response);
                } else {
                    _this.createUser(response);
                }
            });
    }
    onDetail(id): void {
        this._service
            .getUserById(id)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    this.openUserDetailModal(response);
                },
                (response) => super.onError(response))
    }
    openUserDetailModal(response): void {
        response.modules = this._mapperService.makeModulesFlat(response.modules);
        response = snakeToCamelObject(response);
        this.dialogRef = this._matDialog.open(UserDetailComponent, {
            data: response,
            panelClass: 'app-user-detail',
        });
    }
    camelToSentenceCase(text): string {
        return camelToSentenceCase(text);
    }
    confirmDialog(type, id): void {
        const message =
            type === 'invite'
                ? removeRandom(MESSAGES.RESEND_INVITE)
                : removeRandom(MESSAGES.REMOVE_CONFIRMATION);
        const dialogData = new ConfirmDialogModel('Confirm Action', message);
        const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
            data: dialogData,
            disableClose: true,
            panelClass: 'app-confirm-dialog',
            hasBackdrop: true,
        });

        dialogRef.afterClosed().subscribe((status) => {
            if (status) {
                type === 'invite'
                    ? this.resendInvitation(id)
                    : this.deleteUser(id);
            }
        });
    }
    resendInvitation(id): void {
        this._service
            .resendInvite(id)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    this._notifier.success(MESSAGES.INVITE_RESENT);
                },
                (response) => super.onError(response))
    }
    createUser(model: User): void {
        this._service
            .createUser(model)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    const data = this.dataSource.data;
                    data.unshift(response);
                    this.dataSource = new MatTableDataSource(data);
                    this._matDialog.closeAll();
                    this._notifier.success(MESSAGES.CREATED('User'));
                },
                (response) => super.onError(response))

    }
  
    editUser(model: User): void {
        this._service
            .editUser(model.id, model)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    this._notifier.success(MESSAGES.UPDATED('User'));
                    const index = this.dataSource.data.findIndex(
                        (x) => x.id === model.id
                    );
                    this.users[index] = response;
                    this.dataSource = new MatTableDataSource(this.users);
                    this._matDialog.closeAll();
                },
                (response) => super.onError(response)
            );
    }
    deleteUser(id: string): void {
        this._service
            .deleteUser(id)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    const index = this.dataSource.data.findIndex(
                        (x) => x.id === id
                    );
                    this.users.splice(index, 1);
   
                    this.dataSource = new MatTableDataSource(this.users);
                    this._notifier.success(MESSAGES.DELETED('User'));
                },
                (response) => super.onError(response)
            );
    }

    initSearch(): void {
        this.control.valueChanges
            .pipe(
                skip(1),
                map((value: any) => {
                    return value;
                }),
                debounceTime(400),
                distinctUntilChanged()
            )
            .subscribe((text: string) => {
                this.getData({first_name: text})
            });
    }
    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    sortData(e): void {
        this.getData({ sort_order: e.direction ? e.direction : 'asc', sort_by: camelToSnakeCaseText(e.active) });
    }
    onPageFired(data): void {
        this.getData({ page: data['pageIndex'] + 1, limit: data['pageSize'] });
    }
}
