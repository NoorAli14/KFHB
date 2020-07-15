import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FuseSharedModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
    FeaturesRoutingModule
  ]
})
export class FeaturesModule { }
