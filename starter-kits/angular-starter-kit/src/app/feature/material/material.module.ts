import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialComponent } from './material.component';
import { AutocompleteComponent } from './formcontrols/autocomplete/autocomplete.component';
import { PartialsModule } from '../../shared/partials/partials.module';
import { CoreModule } from '../../core/core.module';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';

import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {  MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

const routes: Routes = [
	{
		path: '',
		component: MaterialComponent,
		children: [
			{
				path: 'form-controls/autocomplete',
				component: AutocompleteComponent
			},
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		// material modules
		CoreModule,
		PartialsModule,
		RouterModule.forChild(routes)
	],
	exports: [RouterModule],
	
	providers: [
		MatIconRegistry,
		{ provide: MatBottomSheetRef, useValue: {} },
		{ provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
		{ provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
		{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
	],
	declarations: [
		MaterialComponent,
		AutocompleteComponent,
	]
})
export class MaterialModule {}
