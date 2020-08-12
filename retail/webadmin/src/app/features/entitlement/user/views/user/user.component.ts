import { BaseComponent } from "@shared/components/base/base.component";
import { CONFIG } from "@config/index";
import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { UserFormComponent } from "../../components/user-form/user-form.component";

import { UserService } from "../../services/user.service";
import { MESSAGES } from "@shared/constants/app.constants";

import { FormControl } from "@angular/forms";
import { User } from "@feature/entitlement/models/user.model";
import { Role } from "@feature/entitlement/models/role.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import {
    camelToSentenceCase,
    camelToSnakeCaseText,
    snakeToCamelObject,
} from "@shared/helpers/global.helper";
import {
    ConfirmDialogModel,
    ConfirmDialogComponent,
} from "@shared/components/confirm-dialog/confirm-dialog.component";

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class UserComponent extends BaseComponent implements OnInit {
    dialogRef: any;
    users: User[];
    roles: Role[];
    userPermissions: any[];
    username: FormControl;
    message: string = "";
    type: string = "";

    pageSize: number = CONFIG.PAGE_SIZE;
    pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;

    displayedColumns = [
        "username",
        "firstName",
        "lastName",
        "gender",
        "email",
        "contactNo",
        "status",
        "actions",
    ];

    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    constructor(public _matDialog: MatDialog, private _service: UserService) {
        super("User");
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.username = new FormControl("");
        this.initSearch();
        this.getData();
    }

    loadAllUsers() {
        this._service.getUsers().subscribe(
            (users) => {
                 this.responseMessage = "";
                this.users = users;
            },
            (error) => {
                 this.errorType = "error";
                 this.responseMessage = MESSAGES.UNKNOWN;
            }
        );
    }
    getData() {
        this._service.forkUserData().subscribe(
            (response) => {
                [this.users, this.roles] = response;
                this.dataSource = new MatTableDataSource(this.users);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (error) => {
                console.log(error);
            }
        );
    }
    initSearch() {
        this.username.valueChanges.subscribe((text: string) => {
            this.loadAllUsers();
        });
    }
    camelToSnakeCase(text) {
        return camelToSnakeCaseText(text);
    }
    openDialog(data): void {
        var _this = this;
        this.dialogRef = this._matDialog
            .open(UserFormComponent, {
                data: {
                    roles: this.roles,
                    user:
                        data && data.id ? snakeToCamelObject(data) : new User(),
                },
                panelClass: "app-user-form",
            })
            .componentInstance.sendResponse.subscribe((response) => {
                if (response.id) {
                    _this.editUser(response);
                } else {
                    _this.createUser(response);
                }
            });
    }

    camelToSentenceCase(text) {
        return camelToSentenceCase(text);
    }
    confirmDialog(id): void {
        const message = MESSAGES.REMOVE_CONFIRMATION;
        const dialogData = new ConfirmDialogModel("Confirm Action", message);
        const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
            data: dialogData,
            disableClose: true,
            panelClass: "app-confirm-dialog",
            hasBackdrop: true,
        });

        dialogRef.afterClosed().subscribe((status) => {
            if (status) {
                this.deleteUser(id);
            }
        });
    }

    createUser(model: User) {
        this._service.createUser(model).subscribe(
            (response) => {
                 this.errorType = "success";
                 this.responseMessage = MESSAGES.CREATED("User");
                const data = this.dataSource.data;
                data.push(response);
                this.updateGrid(data);
                this._matDialog.closeAll();
            },
            (response) => {
                 this.errorType = "error";
                 this.responseMessage = MESSAGES.UNKNOWN;
            }
        );
    }
    hideMessage() {
        setTimeout(() => {
             this.responseMessage = "";
        }, 2000);
    }
    editUser(model: User) {
        this._service.editUser(model.id, model).subscribe(
            (response) => {
                 this.errorType = "success";
                 this.responseMessage = MESSAGES.UPDATED("Module");
                const index = this.dataSource.data.findIndex(
                    (x) => x.id == model.id
                );
                this.users[index] = response;
                this.updateGrid(this.users);
                this.hideMessage();
                this._matDialog.closeAll();
            },
            (response) => {
                 this.errorType = "error";
                 this.responseMessage = MESSAGES.UNKNOWN;
            }
        );
    }
    deleteUser(id: string) {
        this._service.deleteUser(id).subscribe(
            (response) => {
                const index = this.dataSource.data.findIndex((x) => x.id == id);
                this.users.splice(index, 1);
                this.updateGrid(this.users);
                 this.errorType = "success";
                this.hideMessage();
                 this.responseMessage = MESSAGES.DELETED("User");
            },
            (response) => {
                 this.errorType = "error";
                 this.responseMessage = MESSAGES.UNKNOWN;
            }
        );
    }
    updateGrid(data) {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}
