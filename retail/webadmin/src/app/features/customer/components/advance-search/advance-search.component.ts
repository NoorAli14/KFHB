import { STATUS_LIST } from './../../../../shared/constants/app.constants';
import {
    camelToSnakeCase,
    cloneDeep,
    getName,
} from "@shared/helpers/global.helper";
import { ReferenceService } from "@shared/services/reference/reference.service";
import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Injector,
    Input,
    SimpleChanges,
} from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { FormGroup, FormControl } from "@angular/forms";
import { map, debounceTime, distinctUntilChanged, skip } from "rxjs/operators";
import { GENDER_LIST } from "@shared/constants/app.constants";
import { fuseAnimations } from "@fuse/animations";
import { BaseComponent } from "@shared/components/base/base.component";

@Component({
    selector: "app-advance-search",
    templateUrl: "./advance-search.component.html",
    styleUrls: ["./advance-search.component.scss"],
    animations: [
        fuseAnimations,
        trigger("slideInOut", [
            transition(":enter", [
                style({ transform: "translateY(-3%)" }),
                animate(
                    "100ms ease-in",
                    style({ transform: "translateY(0%)" })
                ),
            ]),
            transition(":leave", [
                animate(
                    "50ms ease-in",
                    style({ transform: "translateY(-3%)" })
                ),
            ]),
        ]),
    ],
})
export class AdvanceSearchComponent extends BaseComponent implements OnInit {
    isAdvance = false;
    searchForm: FormGroup;
    civilId: FormControl;
    genderList = GENDER_LIST;
    statusList = STATUS_LIST;
    filteredNationalities: any[] = [];
    maxDate: Date;
    @Input() nationalityList;
    @Output() filterChange = new EventEmitter();
    @Output() filterReset = new EventEmitter();

    constructor(private _refService: ReferenceService, injector: Injector) {
        super(injector);
        this.initForm();
    }

    ngOnInit() {
        this.civilId = new FormControl("");
        this.maxDate = new Date();
        this.maxDate.setDate(this.maxDate.getDate());
        this.initSearch();
        this.genderList = [...this.genderList, { id: "", name: "All" }];
        this.filteredNationalities=this.nationalityList;
    }

    openAdvance(status) {
        this.civilId.setValue("");
        this.isAdvance = status;
    }

    ngOnChanges(changes: SimpleChanges): void {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
    }

    ngAfterContentChecked(): void {
        const el = document.querySelectorAll(".mat-form-field-label");
        el.forEach((x) => {
            x["style"].color = "rgba(0, 0, 0, 0.6)";
        });
        const inputs = document.querySelectorAll(".mat-input-element");
        const dropdown = document.querySelector(".mat-select-value-text>span");
        if (dropdown) {
            dropdown["style"].color = "#3c4252";
        }
        inputs.forEach((x) => {
            x["style"].color = "#3c4252";
        });
    }

    initSearch() {
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
                this.filterChange.emit({ national_id_no: text });
            });
    }

    initForm() {
        this.searchForm = new FormGroup({
            firstName: new FormControl(),
            email: new FormControl(),
            lastName: new FormControl(),
            contactNo: new FormControl(),
            nationality: new FormControl(),
            gender: new FormControl(),
            createdOn: new FormControl(),
            status: new FormControl(),
        });
        this.searchForm.get("nationality").valueChanges.subscribe((value) => {
            this.filteredNationalities = this._mapperService.filterData(
                this.nationalityList,
                "nationality",
                value
            );
        });
    }

    displayFn = (id: string): string => {
        if (!id) {
            return "";
        }
        return getName(id, "nationality", cloneDeep(this.nationalityList));
    };

    onReset() {
        this.isAdvance = false;
        this.filterReset.emit();
        this.searchForm.reset();
    }

    onSubmit() {
        const filters = this.searchForm.value;
        Object.keys(filters).forEach(
            (key) => !filters[key] && delete filters[key]
        );
        if (!Boolean(filters)) return;
        this.filterChange.emit(camelToSnakeCase(filters));
        this.isAdvance = false;
    }
}
