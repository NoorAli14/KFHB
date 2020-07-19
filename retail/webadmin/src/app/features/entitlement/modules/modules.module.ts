import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesFormComponent } from './views/modules-form/modules-form.component';
import { ModulesComponent } from './views/modules/modules.component';
import { SharedModule } from '@shared/shared.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';


@NgModule({
  declarations: [ModulesFormComponent, ModulesComponent],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    SharedModule,
    FuseSharedModule,
    MaterialModule
  ]
})
export class ModulesModule { }
