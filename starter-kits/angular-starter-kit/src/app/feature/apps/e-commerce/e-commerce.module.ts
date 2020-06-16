// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// UI
import { PartialsModule } from '../../../shared/partials/partials.module';
// Core
// Auth
import { ModuleGuard } from '../../../core/auth';

// Core => Utils
import { HttpUtilsService,
	TypesUtilsService,
	InterceptService,
	LayoutUtilsService
} from '../../../core/_base/crud';

import { ECommerceComponent } from './e-commerce.component';
// Customers
import { CustomersListComponent } from './customers/customers-list/customers-list.component';

// tslint:disable-next-line:class-name
const routes: Routes = [
	{
		path: '',
		component: ECommerceComponent,
		// canActivate: [ModuleGuard],
		// data: { moduleName: 'ecommerce' },
		children: [
			{
				path: '',
				redirectTo: 'customers',
				pathMatch: 'full'
			},
			{
				path: 'customers',
				component: CustomersListComponent
			},
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		RouterModule.forChild(routes),
	],
	providers: [
		ModuleGuard,
		InterceptService,
      	{
        	provide: HTTP_INTERCEPTORS,
       	 	useClass: InterceptService,
        	multi: true
      	},
		
		TypesUtilsService,
		LayoutUtilsService,
		HttpUtilsService,
		
		TypesUtilsService,
		LayoutUtilsService
	],
	
	declarations: [
		ECommerceComponent,
		// Customers
		CustomersListComponent,
	
	]
})
export class ECommerceModule { }
