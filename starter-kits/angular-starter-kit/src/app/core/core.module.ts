// Anglar
import { NgModule,ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
// Layout Directives
import { GlobalErrorService } from './services/global-error/global-error.service';
// Services
import {
  ContentAnimateDirective,
  FirstLetterPipe,
  GetObjectPipe,
  HeaderDirective,
  JoinPipe,
  MenuDirective,
  OffcanvasDirective,
  SafePipe,
  ScrollTopDirective,
  SparklineChartDirective,
  StickyDirective,
  TabClickEventDirective,
  TimeElapsedPipe,
  ToggleDirective
} from './_base/layout';

@NgModule({
  imports: [CommonModule],
  declarations: [
    // directives
    ScrollTopDirective,
    HeaderDirective,
    OffcanvasDirective,
    ToggleDirective,
    MenuDirective,
    TabClickEventDirective,
    SparklineChartDirective,
    ContentAnimateDirective,
    StickyDirective,
    // pipes
    TimeElapsedPipe,
    JoinPipe,
    GetObjectPipe,
    SafePipe,
    FirstLetterPipe,
  ],
  exports: [
    // directives
    ScrollTopDirective,
    HeaderDirective,
    OffcanvasDirective,
    ToggleDirective,
    MenuDirective,
    TabClickEventDirective,
    SparklineChartDirective,
    ContentAnimateDirective,
    StickyDirective,
    // pipes
    TimeElapsedPipe,
    JoinPipe,
    GetObjectPipe,
    SafePipe,
    FirstLetterPipe,
  ],
  providers: [{provide: ErrorHandler, useClass: GlobalErrorService}]
})
export class CoreModule {
}
