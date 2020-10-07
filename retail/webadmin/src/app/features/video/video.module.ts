import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { VideoComponent } from './views/video/video.component';
import { SharedModule } from '@shared/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '@shared/modules/material/material.module';


@NgModule({
  declarations: [VideoComponent],
  imports: [
    CommonModule,
    VideoRoutingModule,
    SharedModule,
    FuseSidebarModule,
    FuseSharedModule,
    MaterialModule,
  ]
})
export class VideoModule { }
