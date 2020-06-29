// Anglar
import { NgModule,ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// Layout Directives
import { GlobalErrorService } from './services/global-error/global-error.service';
import {AuthInterceptorService} from './services/auth-interceptor/auth-interceptor.service'
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
  providers: [
    {provide: ErrorHandler, useClass: GlobalErrorService},
  {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },]
})
export class CoreModule {
}
