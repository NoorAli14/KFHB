import { AuthUserService } from "@core/services/user/auth-user.service";
import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivate,
    Router,
} from "@angular/router";
import { CoreModule } from "@core/core.module";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private userService: AuthUserService
    ) {}

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        const currentUser = this.userService.User;
        if (currentUser) {
            return true;
        }
        this.router.navigate(["/auth/login"], {
            queryParams: { returnUrl: state.url },
        });
        return false;
    }
}
