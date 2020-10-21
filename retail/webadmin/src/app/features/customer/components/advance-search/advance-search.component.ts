import { ReferenceService } from "@shared/services/reference/reference.service";
import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    Injector,
} from "@angular/core";
import { trigger, transition, style, animate } from "@angular/animations";
import { FormGroup, FormControl } from "@angular/forms";
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { GENDER_LIST } from "@shared/constants/app.constants";
import { fuseAnimations } from "@fuse/animations";
import { BaseComponent } from "@shared/components/base/base.component";
import { MESSAGES } from '@shared/constants/messages.constant';

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
    nationalities=[];
    maxDate: Date;
    @Output() filterChange = new EventEmitter();
    @Output() filterReset = new EventEmitter();

    constructor(
        private _refService: ReferenceService,
         injector: Injector
    ) {
        super(injector);
        // this.getCountries()
    }

    ngOnInit() {
        this.civilId = new FormControl("");
        this.maxDate = new Date();
        this.maxDate.setDate(this.maxDate.getDate());
        this.initForm();
        this.initSearch();
    }
    openAdvance(status) {
        this.civilId.setValue("");
        this.isAdvance = status;
    }
    getCountries(): void {
        this._refService.getCountries().subscribe(
            (response) => {
                this.nationalities=response;
            },
            (response) => {
                this._notifier.error(MESSAGES.UNKNOWN);
            }
        );
    }
    ngAfterContentChecked(): void {
        const el = document.querySelectorAll(".mat-form-field-label");
        el.forEach((x) => {
            x["style"].color = "rgba(0, 0, 0, 0.6)";
        });
        const inputs = document.querySelectorAll(".mat-input-element");
        inputs.forEach((x) => {
            x["style"].color = "#3c4252";
        });
    }
    initSearch() {
        this.civilId.valueChanges
            .pipe(
                map((value: any) => {
                    return value;
                }),
                debounceTime(400),
                distinctUntilChanged()
            )
            .subscribe((text: string) => {
                this.filterChange.emit({ nationalId: text });
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
        });
    }
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
        this.filterChange.emit(filters);
        this.isAdvance = false;
    }
}
