import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { UserFormComponent } from "../../components/user-form/user-form.component";
import { Subject, Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DataSource } from "@angular/cdk/collections";
import { UserService } from "../../services/user.service";
import { User } from "@feature/user/user.model";

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit {
    dialogRef: any;
    users: Array<User>;
    dataSource: FilesDataSource | null;
    displayedColumns = [
        "userId",
        "employeeId",
        "name",
        "country",
        "gender",
        "email",
        "isActive",
        "actions",
    ];
    selected: any;
    // Private
    private _unsubscribeAll: Subject<any>;
    constructor(
        public _matDialog: MatDialog,
        private _userService: UserService,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.dataSource = new FilesDataSource(this._userService);
        this._userService.onFilesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((users) => {
                this.users = users;
            });
    }

    createDialogue(): void {
        const user = new User();
        user.userId = "1";
        this.dialogRef = this._matDialog.open(UserFormComponent, {
            data: user,
            panelClass: "app-user-form",
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            this._userService
                .createUser(response.data)
                .subscribe((response:User) => {
                    this._userService.getUsers();
                });
        });
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onSelect(selected): void {
        this._userService.onFileSelected.next(selected);
    }

    
}

export class FilesDataSource extends DataSource<any> {
    constructor(private _fileManagerService: UserService) {
        super();
    }

    connect(): Observable<any[]> {
        return this._fileManagerService.onFilesChanged;
    }

    disconnect(): void {}
}
