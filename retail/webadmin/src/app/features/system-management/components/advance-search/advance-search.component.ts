import {
    camelToSnakeCase, snakeToCamelArray,
} from '@shared/helpers/global.helper';
import * as QueryString from "query-string";
import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Injector,
    AfterContentChecked,
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormGroup, FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { BaseComponent } from '@shared/components/base/base.component';
import { isUUID } from "@shared/helpers/global.helper";
import { SystemManagementService } from '@feature/system-management/system.service';
import { STATUS_CODE_LIST } from '@shared/constants/app.constants';

@Component({
    selector: 'app-logs-advance-search',
    templateUrl: './advance-search.component.html',
    styleUrls: ['./advance-search.component.scss'],
    animations: [
        fuseAnimations,
        trigger('slideInOut', [
            transition(':enter', [
                style({ transform: 'translateY(-3%)' }),
                animate(
                    '100ms ease-in',
                    style({ transform: 'translateY(0%)' })
                ),
            ]),
            transition(':leave', [
                animate(
                    '50ms ease-in',
                    style({ transform: 'translateY(-3%)' })
                ),
            ]),
        ]),
    ],
})
export class LogsAdvanceSearchComponent extends BaseComponent implements AfterContentChecked, OnInit {
    isAdvance = false;
    searchForm: FormGroup;
    control: FormControl;
    filteredUser: Array<any>;
    auditCodeList= STATUS_CODE_LIST
    @Output() filterChange = new EventEmitter();
    @Output() filterReset = new EventEmitter();

    constructor(private _service: SystemManagementService, injector: Injector) {
        super(injector);
        this.initForm();
    }

    ngOnInit(): void {
        this.control = new FormControl('');
        this.control.disable();
        this.initSearch();
    }

    openAdvance(status): void {
        this.isAdvance = status;
    }

    ngAfterContentChecked(): void {
        const el = document.querySelectorAll('.mat-form-field-label');
        el.forEach((x) => {
            x['style'].color = 'rgba(0, 0, 0, 0.6)';
        });
        const inputs = document.querySelectorAll('.mat-input-element');
        const dropdown = document.querySelector('.mat-select-value-text>span');
        if (dropdown) {
            dropdown['style'].color = '#3c4252';
        }
        inputs.forEach((x) => {
            x['style'].color = '#3c4252';
        });
    }

    initSearch(): void {
        
            this.searchForm.get('userId').valueChanges
            .pipe(debounceTime(400), distinctUntilChanged())
            .subscribe((value) => {
                const filterValue = value?.toLowerCase();
                if (isUUID(filterValue)) return;
                this.filteredUser = [];
                const queryParams = QueryString.stringify({
                    first_name: filterValue,
                });
                this._service.getUsers(queryParams).subscribe((response) => {
                    this.filteredUser = snakeToCamelArray(response.data);
                });
            });
    }
    displayFn = (id: string): string => {
        if (!id) {
            return;
        }
        const user = this.filteredUser.find((item) => item.id === id);
        return user ? `${user.firstName} ${user.lastName}` : "";
    };
    initForm(): void  {
        this.searchForm = new FormGroup({
            userId: new FormControl(),
            auditCode: new FormControl(),
        });
    }
    onSelectUser(id?) {
        if (id) {
           debugger
        } else {
            debugger
        }
    }

    onReset(): void {
        this.isAdvance = false;
        this.filterReset.emit();
        this.searchForm.reset();
    }

    onSubmit(): void {
        const filters = this.searchForm.value;
        Object.keys(filters).forEach(
            (key) => !filters[key] && delete filters[key]
        );
        if (!Boolean(filters)) { return; }
        this.filterChange.emit(camelToSnakeCase(filters));
        this.isAdvance = false;
    }
}
