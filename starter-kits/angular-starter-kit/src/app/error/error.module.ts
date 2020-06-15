import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartialsModule } from '../shared/partials/partials.module';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error.component';
import { Error3Component } from './error3/error3.component';

@NgModule({
  declarations: [
    ErrorComponent,
    Error3Component,
  ],
  imports: [
    CommonModule,
    PartialsModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: ErrorComponent,
        children: [
          {
            path: '404',
            component: Error3Component,
          },
        ],
      },
    ]),
  ],
})
export class ErrorModule {}
