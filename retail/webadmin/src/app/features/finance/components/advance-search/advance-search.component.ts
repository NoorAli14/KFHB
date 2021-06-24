import { STATUS_LIST } from './../../../../shared/constants/app.constants';
import {
    camelToSnakeCase,
    cloneDeep,
    getName,
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
import { FormGroup, FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';
import { GENDER_LIST } from '@shared/constants/app.constants';
import { fuseAnimations } from '@fuse/animations';
import { BaseComponent } from '@shared/components/base/base.component';
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
    civilId: FormControl;
    genderList = GENDER_LIST;
    statusList = STATUS_LIST;
    filteredNationalities: any[] = [];
    maxDate: Date;
    _context: any;
    @Output() filterChange = new EventEmitter();
    @Output() filterReset = new EventEmitter();

    constructor(private _refService: ReferenceService, injector: Injector) {
        super(injector);
        this.initForm();
    }

    ngOnInit(): void {
        this.civilId = new FormControl('');
        this.maxDate = new Date();
        this.maxDate.setDate(this.maxDate.getDate());
        this.initSearch();
        this.genderList = [...this.genderList, { id: '', name: 'All' }];
        _context = this;

        const target = document.getElementById('nationalId');
        target.addEventListener('paste', (e) => {
            this.isAdvance = false;
            let paste = (e.clipboardData || window['clipboardData']).getData('text');
            const filters = this.filterKeys();
            this.filterChange.emit({ national_id_no: paste, ...filters });
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
        this.civilId.valueChanges
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
                this.filterChange.emit({ national_id_no: text, ...filters });
            });
    }

    initForm(): void {
        this.searchForm = new FormGroup({
            startDate: new FormControl(),
            endDate: new FormControl(),
            applicationCompleted: new FormControl(),
            status: new FormControl(),
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
        if (!Boolean(filters)) { return; }
        this.filterChange.emit(camelToSnakeCase(filters));
        this.isAdvance = false;
    }

    filterKeys() {
        const filters = this.searchForm.value;
        filters.national_id_no = this.civilId.value;
        Object.keys(filters).forEach(
            (key) => !filters[key] && delete filters[key]
        );
        return filters;
    }
}
