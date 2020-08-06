import { CONFIG } from "./../../../../../config/index";
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
import { AuthUserService } from "@core/services/user/auth-user.service";

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit {
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

    constructor(
        public _matDialog: MatDialog,
        private _service: UserService,
        private _authUserService: AuthUserService
    ) {}

    ngOnInit(): void {
        this.userPermissions = this._authUserService.getPermissionsByModule(
            "User"
        );
        this.username = new FormControl("");
        this.initSearch();
        this.getData();
    }

    loadAllUsers() {
        this._service.getUsers().subscribe(
            (users) => {
                this.message = "";
                this.users = users;
            },
            (error) => {
                this.type = "error";
                this.message = MESSAGES.UNKNOWN;
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
                    user: data && data.id ? snakeToCamelObject(data) : new User(),
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
                this.type = "success";
                this.message = MESSAGES.CREATED("User");
                const data = this.dataSource.data;
                data.push(response);
                this.updateGrid(data);
                this._matDialog.closeAll();
            },
            (response) => {
                this.type = "error";
                this.message = MESSAGES.UNKNOWN;
            }
        );
    }
    hideMessage() {
        setTimeout(() => {
            this.message = "";
        }, 2000);
    }
    editUser(model: User) {
        this._service.editUser(model.id, model).subscribe(
            (response) => {
                this.type = "success";
                this.message = MESSAGES.UPDATED("Module");
                const index = this.dataSource.data.findIndex(
                    (x) => x.id == model.id
                );
                this.users[index] = response;
                this.updateGrid(this.users);
                this.hideMessage();
                this._matDialog.closeAll();
            },
            (response) => {
                this.type = "error";
                this.message = MESSAGES.UNKNOWN;
            }
        );
    }
    deleteUser(id: string) {
        this._service.deleteUser(id).subscribe(
            (response) => {
                const index = this.dataSource.data.findIndex((x) => x.id == id);
                this.users.splice(index, 1);
                this.updateGrid(this.users);
                this.type = "success";
                this.hideMessage();
                this.message = MESSAGES.DELETED("User");
            },
            (response) => {
                this.type = "error";
                this.message = MESSAGES.UNKNOWN;
            }
        );
    }
    updateGrid(data) {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}
