import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-required-indicator',
  template: `<span>*</span>`
})
export class RequiredIndicatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
