import { BaseComponent } from "@shared/components/base/base.component";
import { Component, OnInit, ViewEncapsulation, Injector } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { Role } from "@feature/entitlement/models/role.model";

import { removeRandom } from "@shared/helpers/global.helper";
import { MODULES } from "@shared/constants/app.constants";
import {
    ConfirmDialogModel,
    ConfirmDialogComponent,
} from "@shared/components/confirm-dialog/confirm-dialog.component";
import { RoleService } from "../../services/role.service";
import { RoleFormComponent } from "../../components/role-form/role-form.component";
import { cloneDeep } from "lodash";
import { Modules } from "@feature/entitlement/models/modules.model";
import {
    debounceTime,
    distinctUntilChanged,
    map,
    skip,
    takeUntil,
} from "rxjs/operators";
import { MESSAGES } from "@shared/constants/messages.constant";
import { FormControl } from "@angular/forms";
import { CONFIG } from "@config/index";
import * as QueryString from "query-string";
@Component({
    selector: "app-role",
    templateUrl: "./role.component.html",
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class RoleComponent extends BaseComponent implements OnInit {
    roles: Role[] = [];
    modules: Modules[] = [];
    permissions: Permissions[] = [];
    dialogRef: any;
    control: FormControl;
    config: object;
    displayedColumns = [
        "name",
        "description",
        "createdOn",
        "expandIcon",
        "action",
    ];

    constructor(
        public _matDialog: MatDialog,
        private _roleService: RoleService,
        injector: Injector
    ) {
        super(injector, MODULES.ROLE_MANAGEMENT);
        super.ngOnInit();
    }
    ngOnInit(): void {
        this.config = this.initParams();
        this.getData(this.config);
        this.control = new FormControl();
        this.initSearch();
    }
    initParams(): object {
        return {
            limit: CONFIG.PAGE_SIZE,
            page: 1,
            sort_order: "desc",
            sort_by: "created_on",
        };
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
                this.getData({ name: text });
            });
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
        this._roleService
            .forkRolesData(queryParams)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    this.roles = response[0];
                    this.permissions = response[2];
                    this.modules = this._mapperService.removeParent(
                        response[1]
                    );
                },
                (response) => {
                    this._notifier.error(MESSAGES.UNKNOWN);
                }
            );
    }

    openDialog(data, modules): void {
        const _this = this;
        this.dialogRef = this._matDialog
            .open(RoleFormComponent, {
                data: {
                    role: data ? data : new Role(),
                    userPermissions: this.userPermissions,
                    modules: modules ? modules : cloneDeep(this.modules),
                    roles: this.roles,
                    permissions: this.permissions,
                },
                disableClose: true,
                hasBackdrop: true,
                panelClass: "app-role-form",
            })
            .componentInstance.sendResponse.subscribe((response) => {
                if (response.id) {
                    _this.editRole(response);
                } else {
                    _this.createRole(response);
                }
            });
    }
    confirmDialog(id): void {
        const message = removeRandom(MESSAGES.REMOVE_CONFIRMATION);
        const dialogData = new ConfirmDialogModel("Confirm Action", message);
        const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
            data: dialogData,
            disableClose: true,
            panelClass: "app-confirm-dialog",
            hasBackdrop: true,
        });

        dialogRef.afterClosed().subscribe((status) => {
            if (status) {
                this.onDelete(id);
            }
        });
    }

    onEditHandler(data): void {
        const flatModules = this._mapperService.makeModulesFlat(
            cloneDeep(data.modules)
        );
        let modules = cloneDeep(this.modules);
        modules = modules.map((el) => {
            const exist = flatModules.find((x) => x.id === el.id);
            if (!exist) {
                return el;
            }
            el.permissions = el.permissions.map((x) => {
                const item = exist.permissions.find((y) => y.id === x.id);
                return {
                    ...x,
                    value: item ? true : false,
                    ...item,
                };
            });
            return el;
        });
        this.openDialog(data, modules);
    }

    createRole(data: Role): void {
        this._roleService
            .createRole(data)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    this._notifier.success(MESSAGES.CREATED("Role"));
                    const clone = cloneDeep(this.roles);
                    response.role_name = response.name;
                    clone["data"].unshift(response);
                    this.roles = clone;
                    this._matDialog.closeAll();
                },
                (response) => {
                    this._notifier.error(MESSAGES.UNKNOWN);
                }
            );
    }

    editRole(model: Role): void {
        this._roleService
            .editRole(model.id, model)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    response.role_name = response.name;
                    this._notifier.success(MESSAGES.UPDATED("Role"));
                    const clone = cloneDeep(this.roles);
                    const index = clone["data"].findIndex(
                        (x) => x.id === model.id
                    );
                    clone["data"][index] = response;
                    this.roles = clone;
                    this._matDialog.closeAll();
                },
                (response) => {
                    this._notifier.error(MESSAGES.UNKNOWN);
                }
            );
    }
    onDelete(id: string): void {
        this._roleService
            .deleteRole(id)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (response) => {
                    const index = this.roles["data"].findIndex(
                        (x) => x.id === id
                    );
                    const clone = cloneDeep(this.roles);
                    clone["data"].splice(index, 1);
                    this.roles = clone;
                    this._notifier.success(MESSAGES.DELETED("Role"));
                },
                (response) => {
                    this._notifier.error(MESSAGES.UNKNOWN);
                }
            );
    }
}
