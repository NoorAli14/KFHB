import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-required-indicator',
  template: `<span style="color:red">*</span>`
})
export class RequiredIndicatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
