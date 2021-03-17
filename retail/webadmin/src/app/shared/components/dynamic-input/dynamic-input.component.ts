import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss']
})
export class DynamicInputComponent implements OnInit {
  @Input() type: string;
  @Input() label: string;
  @Input() answer: any;
  @Input() options: any[];
  constructor() { }

  ngOnInit(): void {
  }

  getChecked(item) {
    return Array.isArray(this.answer) ? this.answer.find(x => x === item) : this.answer === item;
  }
}
