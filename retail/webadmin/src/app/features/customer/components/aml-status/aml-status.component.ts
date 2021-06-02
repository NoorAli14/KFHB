import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-aml-status',
  templateUrl: './aml-status.component.html',
  styleUrls: ['./aml-status.component.scss']
})
export class AmlStatusComponent implements OnInit {
  @Input() status;
  constructor() { }

  ngOnInit(): void {
  }

}
