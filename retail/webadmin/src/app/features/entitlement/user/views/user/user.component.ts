import { CONFIG } from './../../../../../config/index';
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
import { camelToSentenceCase } from "@shared/helpers/global.helper";
import { ConfirmDialogModel, ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

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
    username: FormControl;
    message: string = "";
    type: string = "";

    pageSize:number=CONFIG.PAGE_SIZE;
    pageSizeOptions:Array<number>=CONFIG.PAGE_SIZE_OPTIONS;
  
    
    displayedColumns = [
        "username",
        "firstName",
        "middleName",
        "lastName",
        "contactNo",
        "nationalityId",
        "gender",
        "email",
        "status",
        "actions",
    ];

    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    constructor(
        public _matDialog: MatDialog,
        private _userService: UserService
    ) {}

    ngOnInit(): void {
        this.username = new FormControl("");
        this.initSearch();
        this.getData();
    }

    loadAllUsers() {
        this._userService.getUsers().subscribe(
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
        this._userService.forkUserData().subscribe(
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
    onCreateDialog(): void {
        this.dialogRef = this._matDialog.open(UserFormComponent, {
            data: {
                roles: this.roles,
                user: new User(),
            },
            panelClass: "app-user-form",
            disableClose: true,
            hasBackdrop: true,
        });
        // this.dialogRef.afterClosed().subscribe((response) => {
        //     this.dataSource.data = [...this.dataSource.data, response];
        // });
    }
    onEditDialog(user: User) {
        this.dialogRef = this._matDialog.open(UserFormComponent, {
            data: {
                roles: this.roles,
                user,
            },
            panelClass: "app-user-form",
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            console.log(response);
        });
    }
    camelToSentenceCase(text) {
        return camelToSentenceCase(text);
    }
    confirmDialog(): void {
        const message = MESSAGES.REMOVE_CONFIRMATION;
        const dialogData = new ConfirmDialogModel("Confirm Action", message);
        const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
            data: dialogData,
            disableClose: true,
            panelClass: "app-confirm-dialog",
            hasBackdrop: true,
        });

        dialogRef.afterClosed().subscribe((dialogResult) => {});
    }
}
