import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormGroup, FormControl } from '@angular/forms';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { GENDER_LIST } from '@shared/constants/app.constants';

@Component({
  selector: 'app-advance-search',
  templateUrl: './advance-search.component.html',
  styleUrls: ['./advance-search.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-3%)' }),
        animate('100ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('50ms ease-in', style({ transform: 'translateY(-3%)' }))
      ])
    ])
  ]
})
export class AdvanceSearchComponent implements OnInit {
  isAdvance = false;
  searchForm: FormGroup;
  civilId: FormControl;
  genderList= GENDER_LIST;
  maxDate: Date;
  @Output() filterChange = new EventEmitter();
  @Output() filterReset = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.civilId = new FormControl('');
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());
    this.initForm();
    this.initSearch();
  }
  openAdvance(status) {
    this.civilId.setValue('');
    this.isAdvance = status;
  }
  initSearch() {
    this.civilId.valueChanges.pipe(
      map((value: any) => {
        return value;
      }),
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((text: string) => {
      this.filterChange.emit({ nationalId: text });
    });
  }
  initForm() {
    this.searchForm = new FormGroup({
      firstName: new FormControl(),
      middleName: new FormControl( ),
      lastName: new FormControl( ),
      contactNo: new FormControl( ),
  });
  }
  onReset() {
    this.isAdvance = false;
    this.filterReset.emit();
    this.searchForm.reset();
  }
  onSubmit() {
    const filters = this.searchForm.value;
    Object.keys(filters).forEach((key) => (!filters[key]) && delete filters[key]);
    if (!Boolean(filters)) return;
    this.filterChange.emit(filters);
    this.isAdvance = false;
  }
}
