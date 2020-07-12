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
        "id",
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
    selected: any;
    // Private
    constructor(
        public _matDialog: MatDialog,
        private _userService: UserService,
    ) {
    }

    ngOnInit(): void {
        this.dataSource = new FilesDataSource(this._userService);
    }

    onCreateDialog(): void {
        const user = new User();
        this.dialogRef = this._matDialog.open(UserFormComponent, {
            data: user,
            panelClass: "app-user-form",
            disableClose:true
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            this._userService
                .createUser(response.data)
                .subscribe((response:User) => {
                    this._userService.getUsers();
                });
        });
    }
    onEditDialog(user:User){
        this.dialogRef = this._matDialog.open(UserFormComponent, {
            data: user,
            panelClass: "app-user-form",
        });
        this.dialogRef.afterClosed().subscribe((response) => {
            
        });
    }
    ngOnDestroy(): void {
    }
}

export class FilesDataSource extends DataSource<User> {
    constructor(private _service: UserService) {
        super();
    }

    connect(): Observable<any[]> {
        return this._service.getUsers();
    }

    disconnect(): void {}
}
