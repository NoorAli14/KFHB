import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { fuseAnimations } from "@fuse/animations";
import { MatDialog } from "@angular/material/dialog";
import { UserFormComponent } from "../../components/user-form/user-form.component";
import { Subject, Observable } from 'rxjs';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { takeUntil } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { FileManagerService } from '../../file-manager.service';

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrls: ["./user.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit {
    dialogRef: any;

    createDialogue(): void {
        this.dialogRef = this._matDialog.open(UserFormComponent, {
            panelClass: "app-user-form",
        });
        this.dialogRef.afterClosed().subscribe((response) => {});
    }
    files: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['icon', 'name', 'type', 'owner', 'size', 'modified', 'actions'];
    selected: any;

    // Private
    private _unsubscribeAll: Subject<any>;
    constructor(
        public _matDialog: MatDialog,
        private _fileManagerService: FileManagerService,
        private _fuseSidebarService: FuseSidebarService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void
    {
        this.dataSource = new FilesDataSource(this._fileManagerService);
        this._fileManagerService.onFilesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(files => {
                this.files = files;
            });

        this._fileManagerService.onFileSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selected => {
                this.selected = selected;
            });
    }


    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onSelect(selected): void
    {
        this._fileManagerService.onFileSelected.next(selected);
    }

    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}

export class FilesDataSource extends DataSource<any>
{

    constructor(
        private _fileManagerService: FileManagerService
    )
    {
        super();
    }

    connect(): Observable<any[]>
    {
        return this._fileManagerService.onFilesChanged;
    }

    disconnect(): void
    {
    }
}
