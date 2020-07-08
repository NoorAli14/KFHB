import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { MatIconModule } from '@angular/material/icon';
import { FuseSharedModule } from '@fuse/shared.module';


@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    MatIconModule,

        FuseSharedModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
