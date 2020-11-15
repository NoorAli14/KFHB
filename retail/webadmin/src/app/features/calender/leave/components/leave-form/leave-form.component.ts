import { REGEX } from "@config/index";
import {
    Component,
    EventEmitter,
    Inject,
    Injector,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Leave } from "@feature/calender/models/leave.model";
import { fuseAnimations } from "@fuse/animations";
import { BaseComponent } from "@shared/components/base/base.component";
import { DATE_FORMAT, MODULES } from "@shared/constants/app.constants";
import {
    camelToSnakeCase,
    cloneDeep,
    getName,
    regexValidator,
} from "@shared/helpers/global.helper";
import * as moment from "moment";
import { takeUntil, filter } from "rxjs/operators";

@Component({
    selector: "app-leave-form",
    templateUrl: "./leave-form.component.html",
    styleUrls: ["./leave-form.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class LeaveFormComponent
    extends BaseComponent
    implements OnDestroy, OnInit {
    @Output() sendResponse: EventEmitter<Leave> = new EventEmitter<any>();
    leaveForm: FormGroup;
    leaveTypes: Array<any>;
    users: Array<any>;
    filteredUser: Array<any>;
    isAdmin = false;
    constructor(
        public matDialogRef: MatDialogRef<LeaveFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        injector: Injector
    ) {
        super(injector, MODULES.LEAVES);
        super.ngOnInit();
    }

    ngOnInit(): void {
        this.leaveTypes = this.data.leaveTypes;
        const users = this.data.users?.filter(
            (x) =>
                x.roles.find((item) => item.name !== "SUPER ADMIN") &&
                x.status === "ACTIVE"
        );
        this.users = [...users];
        this.filteredUser = [...users];

        this.leaveForm = new FormGroup({
            id: new FormControl(this.data.leave.id),
            startDate: new FormControl(this.data.leave.startDate, [
                Validators.required,
                this.validateDate.bind(this),
            ]),
            endDate: new FormControl(this.data.leave.endDate, [
                Validators.required,
                this.validateDate.bind(this),
            ]),
            leaveTypeId: new FormControl(this.data.leave.leaveTypeId, [
                Validators.required,
            ]),
            remarks: new FormControl(this.data.leave.remarks, [
                Validators.required,
            ]),
            userId: new FormControl(this.data.leave.userId, [
                Validators.required,
                regexValidator(new RegExp(REGEX.UUID), { uuid: true }),
            ]),
        });
        this.isAdmin = this._authUserService.User?.roles?.find(
            (x) => x.name === "SUPER ADMIN"
        )
            ? true
            : false;
        if (!this.isAdmin) {
            this.leaveForm
                .get("userId")
                .setValue(this._authUserService.User.id);
        }
        this.leaveForm.get("userId").valueChanges.subscribe((value) => {
            const filterValue = value?.toLowerCase();
            this.filteredUser = this.users.filter((option) => {
                return (
                    option["firstName"]?.toLowerCase().indexOf(filterValue) ===
                        0 ||
                    option["lastName"]?.toLowerCase().indexOf(filterValue) ===
                        0 ||
                    option["email"]?.toLowerCase().indexOf(filterValue) === 0
                );
            });
        });
    }
    displayFn = (id: string): string => {
        if (!id) {
            return;
        }
        const user = this.users.find((item) => item.id === id);
        return user ? `${user.firstName} ${user.lastName}` : "";
    };

    validateDate(control: FormControl): { [s: string]: boolean } {
        if (
            this.leaveForm &&
            this.leaveForm.controls.endDate.value &&
            this.leaveForm.controls.startDate.value
        ) {
            const start = moment(
                this.leaveForm.controls.startDate.value
            ).format(DATE_FORMAT);
            const end = moment(this.leaveForm.controls.endDate.value).format(
                DATE_FORMAT
            );
            const isAfter = moment(end).isSameOrAfter(start);
            if (isAfter) {
                this.leaveForm.controls.startDate.setErrors(null);
                this.leaveForm.controls.endDate.setErrors(null);
            }
            return isAfter ? null : { compareDate: true };
        }
        return null;
    }
    onSubmit(): void {
        let model = { ...this.leaveForm.value };
        debugger;
        model.startDate = moment(model.startDate).format(DATE_FORMAT);
        model.endDate = moment(model.endDate).format(DATE_FORMAT);
        model = camelToSnakeCase(model);
        this.sendResponse.emit(model);
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        // this._dialogRef.closeAll();
    }
    onClose(): void {
        this.sendResponse.emit();
        this.matDialogRef.close();
    }
}
