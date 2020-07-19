import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './views/role/role.component';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { SharedModule } from '@shared/shared.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';


@NgModule({
  declarations: [RoleComponent, RoleFormComponent],
  imports: [
    RoleRoutingModule,
    CommonModule,
    FuseSharedModule,
    SharedModule,
    MaterialModule
  ]
})
export class RoleModule { }
