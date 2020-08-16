import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router
} from '@angular/router';
import { CoreModule } from '@core/core.module';
import { AuthenticationService } from '../auth/authentication.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: CoreModule
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService, private userService: UserService) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const currentUser = this.userService.getUserData();
    if (currentUser && currentUser.user.roles && currentUser.user.roles.length>0) {
      const [role] = currentUser.user.roles;
        if (route.data.roles && !route.data.roles.find(r=>r===role['roleName'])) {
            this.router.navigate(['access-denied']);
            return false;
        }
        return true;
    }

    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
