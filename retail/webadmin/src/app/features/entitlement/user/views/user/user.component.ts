import {
    Component,
    AfterViewInit,
    OnInit,
    ViewEncapsulation,
    ViewChild,
} from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { UserFormComponent } from "../../components/user-form/user-form.component";
import { tap } from "rxjs/operators";

import { UserService } from "../../services/user.service";
import { User } from "@feature/entitlement/models/user.model";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { FormControl } from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import { merge } from "rxjs";
import { MESSAGES } from "@shared/constants/app.constants";
import {
    ConfirmDialogComponent,
    ConfirmDialogModel,
} from "@shared/components/confirm-dialog/confirm-dialog.component";

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit, AfterViewInit {
    dialogRef: any;
    dataSource = new MatTableDataSource<User>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    username: FormControl;
    message: string = "";
    type: string = "";

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
    constructor(
        public _matDialog: MatDialog,
        private _userService: UserService
    ) {}

    ngOnInit(): void {
        this.username = new FormControl("");
        this.initSearch();
        this.loadAllUsers();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(tap(() => this.loadAllUsers()))
            .subscribe();
    }
    loadAllUsers() {
        debugger
        this._userService.getUsers().subscribe(
            (users) => {
                this.dataSource.data = users as User[];
                this.message = "";
            },
            (error) => {
                this.type = "error";
                this.message = MESSAGES.UNKNOWN;
            }
        );
    }
    initSearch() {
        this.username.valueChanges.subscribe((text: string) => {
            this.paginator.pageIndex = 0;
            this.loadAllUsers();
        });
    }
    onCreateDialog(): void {
        const user = new User();
        this.dialogRef = this._matDialog.open(UserFormComponent, {
            data: user,
            panelClass: "app-user-form",
            disableClose: true,
            hasBackdrop: true,
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            this.dataSource.data = [...this.dataSource.data, response];
        });
    }
    onEditDialog(user: User) {
        this.dialogRef = this._matDialog.open(UserFormComponent, {
            data: user,
            panelClass: "app-user-form",
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            console.log(response);
        });
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
