import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls:['./not-found.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
