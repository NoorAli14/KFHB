import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './views/modules/modules.component';
import { SharedModule } from '@shared/shared.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';
import { ModulesFormComponent } from './components/modules-form/modules-form.component';


@NgModule({
  declarations: [ModulesFormComponent, ModulesComponent],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    SharedModule,
    FuseSharedModule,
    MaterialModule,
  ]
})
export class ModulesModule { }
