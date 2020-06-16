// Angular
import { Component, OnInit, ChangeDetectionStrategy,  } from '@angular/core';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-customers-list',
	templateUrl: './customers-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CustomersListComponent implements OnInit {
	// Table fields
	ngOnInit(): void {
	}
}
