// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
// NGRX
import { select, Store } from '@ngrx/store';
// Auth reducers and selectors

@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(true)
  }
}
