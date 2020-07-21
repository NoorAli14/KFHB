import {
    Component,
    OnInit,
    ViewEncapsulation,
} from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { UserFormComponent } from "../../components/user-form/user-form.component";

import { UserService } from "../../services/user.service";
import { MESSAGES } from "@shared/constants/app.constants";

import { FormControl } from '@angular/forms';
import { User } from '@feature/entitlement/models/user.model';

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit {
    dialogRef: any;
    users:User[];
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

    loadAllUsers() {
        this._userService.getUsers().subscribe(
            (users) => {
                this.message = "";
                this.users=users;
            },
            (error) => {
                this.type = "error";
                this.message = MESSAGES.UNKNOWN;
            }
        );
    }
    initSearch() {
        this.username.valueChanges.subscribe((text: string) => {
            // this.paginator.pageIndex = 0;
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
        // this.dialogRef.afterClosed().subscribe((response) => {
        //     this.dataSource.data = [...this.dataSource.data, response];
        // });
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
}
