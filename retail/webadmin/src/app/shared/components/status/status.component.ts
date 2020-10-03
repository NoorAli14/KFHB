import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StatusComponent implements OnInit {
  @Input() status: string;
  constructor() { }

  ngOnInit(): void {
  }

}
