import {
    camelToSnakeCase,
} from '@shared/helpers/global.helper';
import { ReferenceService } from '@shared/services/reference/reference.service';
import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Injector,
    AfterContentChecked,
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { BaseComponent } from '@shared/components/base/base.component';
import * as moment from 'moment';
var _context;
@Component({
    selector: 'app-advance-search',
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
export class AdvanceSearchComponent extends BaseComponent implements AfterContentChecked, OnInit {
    isAdvance = false;
    searchForm: FormGroup;
    cpr: FormControl;
    statusList = ['Review', 'Accept', 'Reject', 'Request'];
    applicationTypes = ['Real State', 'Auto Finance'];
    maxDate: Date;
    _context: any;
    @Output() filterChange = new EventEmitter();
    @Output() filterReset = new EventEmitter();

    constructor(injector: Injector) {
        super(injector);
        this.initForm();
    }

    ngOnInit(): void {
        this.cpr = new FormControl('');
        this.maxDate = new Date();
        this.maxDate.setDate(this.maxDate.getDate());
        this.initSearch();
        _context = this;

        const target = document.getElementById('cpr');
        target.addEventListener('paste', (e) => {
            this.isAdvance = false;
            let paste = (e.clipboardData || window['clipboardData']).getData('text');
            const filters = this.filterKeys();
            this.filterChange.emit({ cpr: paste, ...filters });
        })
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
        this.cpr.valueChanges
            .pipe(
                skip(1),
                map((value: any) => {
                    return value;
                }),
                debounceTime(400),
                distinctUntilChanged()
            )
            .subscribe((text: string) => {
                this.isAdvance = false;
                const filters = this.filterKeys();
                this.filterChange.emit({ cpr: text, ...filters });
            });
    }

    initForm(): void {
        this.searchForm = new FormGroup({
            dateFrom: new FormControl('', [Validators.required]),
            dateTo: new FormControl('', [Validators.required]),
            isCompleted: new FormControl(),
            status: new FormControl(),
            applicationType: new FormControl(),
        });
    }

    displayFn(id): string {
        return id
    }

    onReset(): void {
        this.isAdvance = false;
        this.filterReset.emit();
        this.searchForm.reset();
    }

    onSubmit(): void {
        const filters = this.filterKeys();
        const form = this.searchForm.value;

        if (moment(form.dateFrom) > moment(form.dateTo)) {
            this._notifier.error('Invalid date');
            return;
        }
        if (form.isCompleted) {
            form.isCompleted = form.isCompleted == 'Yes' ? true : false
        }

        if (!Boolean(filters)) { return; }
        this.filterChange.emit(filters);
        this.isAdvance = false;
    }

    filterKeys() {
        const filters = this.searchForm.value;
        filters.cpr = this.cpr.value;
        Object.keys(filters).forEach(
            (key) => !filters[key] && delete filters[key]
        );
        return filters;
    }
}
