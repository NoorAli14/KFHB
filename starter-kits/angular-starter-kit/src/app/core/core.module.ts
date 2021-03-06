import { NgModule,ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '@shared/services/auth-interceptor/auth-interceptor.service';
import { GlobalErrorService } from '@shared/services/global-error/global-error.service';
import { ErrorInterceptorService } from '@shared/services/error-interceptor/error-interceptor.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },

     {

      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
     {provide: ErrorHandler, useClass: GlobalErrorService}
  ]
})
export class CoreModule { }
