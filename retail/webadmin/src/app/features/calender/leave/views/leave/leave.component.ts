import { Leave } from './../../../models/leave.model';
import {
    Component,
    Injector,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CONFIG } from '@config/index';
import { CalendarService } from '@feature/calender/services/calendar.service';
import { BaseComponent } from '@shared/components/base/base.component';
import {
    ConfirmDialogModel,
    ConfirmDialogComponent,
} from '@shared/components/confirm-dialog/confirm-dialog.component';
import {
    snakeToCamelArray,
    camelToSentenceCase,
    camelToSnakeCase,
    snakeToCamelObject,
    getName,
} from '@shared/helpers/global.helper';
import { MESSAGES } from '@shared/constants/messages.constant';
import { LeaveFormComponent } from '../../components/leave-form/leave-form.component';
import { fuseAnimations } from '@fuse/animations';
import { MODULES } from '@shared/constants/app.constants';

@Component({
    selector: 'app-leave',
    templateUrl: './leave.component.html',
    styleUrls: ['./leave.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class LeaveComponent extends BaseComponent implements OnInit {
    dialogRef: any;
    leaves: Leave[];
    displayedColumns = ['User', 'leaveTypeId', 'startDate', 'endDate', 'action'];
    pageSize: number = CONFIG.PAGE_SIZE;
    pageSizeOptions: Array<number> = CONFIG.PAGE_SIZE_OPTIONS;
    dataSource = new MatTableDataSource<Leave>();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    users: Array<any>;
    leaveTypes: Array<any>;
    constructor(
        public _matDialog: MatDialog,
        private _service: CalendarService,
        injector: Injector
    ) {
        super(injector, MODULES.LEAVES);
        super.ngOnInit();
    }

    ngOnInit(): void {
        this.getData();
    }

    getData(): void {
        this._service.forkLeaveData().subscribe(
            (response) => {
                this.leaves = snakeToCamelArray(response[0]);
                this.leaveTypes = snakeToCamelArray(response[1]);
                this.users = snakeToCamelArray(response[2]);
                this.dataSource = new MatTableDataSource(
                    snakeToCamelArray(this.leaves)
                );
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (error) => {
                this._notifier.error(MESSAGES.UNKNOWN);
            }
        );
    }
    getLeaveType(id): string {
        return getName(id, 'name', this.leaveTypes);
    }
    getUserName(id): string {
        const user = this.users.find((x) => x.id === id);
        return user ? `${user.firstName} ${user.lastName}` : 'N/A';
    }
    openDialog(data): void {
        const _this = this;
        this.dialogRef = this._matDialog
            .open(LeaveFormComponent, {
                data: {
                    leave: data ? data : new Leave(),
                    leaveTypes: this.leaveTypes,
                    users: this.users,
                },
                panelClass: 'app-leave-form',
                disableClose: true,
                hasBackdrop: true,
            })
            .componentInstance.sendResponse.subscribe((response) => {
                if (response.id) {
                    _this.editLeave(response);
                } else {
                    _this.createLeave(response);
                }
            });
    }

    createLeave(model: Leave): void {
        this._service.createLeave(model).subscribe(
            (response) => {
                const data: any = this.dataSource.data;
                data.unshift(snakeToCamelObject(response));

                this.updateGrid(data);
                this._matDialog.closeAll();
                this._notifier.success(MESSAGES.CREATED('Leave'));
            },
            (response) => {
                this._notifier.error(MESSAGES.UNKNOWN);
            }
        );
    }

    editLeave(model: Leave): void {
        this._service.editLeave(model.id, model).subscribe(
            (response) => {
                const index = this.dataSource.data.findIndex(
                    (x) => x.id === model.id
                );
                const mapped: any = snakeToCamelObject(response);
                this._notifier.success(MESSAGES.UPDATED('Leave'));
                this.leaves[index] = mapped;
                this.updateGrid(this.leaves);
                this._matDialog.closeAll();
            },
            (response) => {
                this._notifier.error(MESSAGES.UNKNOWN);
            }
        );
    }
    confirmDialog(type, id): void {
        const message = MESSAGES.REMOVE_CONFIRMATION;
        const dialogData = new ConfirmDialogModel('Confirm Action', message);
        const dialogRef = this._matDialog.open(ConfirmDialogComponent, {
            data: dialogData,
            disableClose: true,
            panelClass: 'app-confirm-dialog',
            hasBackdrop: true,
        });

        dialogRef.afterClosed().subscribe((status) => {
            if (status) {
                this.deleteLeave(id);
            }
        });
    }
    deleteLeave(id: string): void {
        this._service.deleteLeave(id).subscribe(
            (response) => {
                const index = this.dataSource.data.findIndex(
                    (x) => x.id === id
                );
                this.leaves.splice(index, 1);
                this.updateGrid(this.leaves);
                this._notifier.success(MESSAGES.DELETED('Leave'));
            },
            (response) => {
                this._notifier.error(MESSAGES.UNKNOWN);
            }
        );
    }
    camelToSentenceCase(text): string {
        return camelToSentenceCase(text);
    }
    camelToSnakeCase(text): object {
        return camelToSnakeCase(text);
    }
    updateGrid(data): void {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}
