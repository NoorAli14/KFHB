import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const routePermissions = this.reflector.get<string[]>(
            'permissions',
            context.getHandler(),
        );

        console.log(routePermissions);
        if (!routePermissions) {
            return true;
        }
        const permissions: string[] = context.getArgs()[0].permissions;
        const hasPermission = () =>
            routePermissions.some(routePermission =>
                permissions.includes(routePermission),
            );

        return hasPermission();
    }
}